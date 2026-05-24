import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./UntangleGame.module.scss";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { GameScore } from "../../types";

interface Node {
  id: number;
  x: number; // 0-100 percentage
  y: number;
}

interface Edge {
  u: number;
  v: number;
  intersecting: boolean;
}

const UntangleGame: React.FC = () => {
  // Game State
  const [level, setLevel] = useState(1);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [gameState, setGameState] = useState<"PLAYING" | "LEVEL_CLEAR">("PLAYING");
  const [intersectionsCount, setIntersectionsCount] = useState(0);
  const [highScore, setHighScore] = useState(0); // Max Level reached

  const [draggingNode, setDraggingNode] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<GameScore[]>([]);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Graph Generation Logic ---
  const generateLevel = useCallback((lvl: number) => {
    const n = Math.min(4 + lvl - 1, 20); // Level 1 starts with 4 nodes, max 20
    const newEdges: Edge[] = [];
    
    // Create planar graph (polygon + non-crossing chords)
    for (let i = 0; i < n; i++) {
      newEdges.push({ u: i, v: (i + 1) % n, intersecting: false });
    }
    
    let attempts = n * 2;
    while (attempts > 0) {
      let u = Math.floor(Math.random() * n);
      let v = Math.floor(Math.random() * n);
      if (u !== v) {
        if (u > v) {
          const temp = u;
          u = v;
          v = temp;
        }
        
        // Skip if adjacent
        if (v - u === 1 || (u === 0 && v === n - 1)) {
          attempts--;
          continue;
        }
        
        // Skip if exists
        if (newEdges.some((e) => e.u === u && e.v === v)) {
          attempts--;
          continue;
        }
        
        // Check for crossing chords on the polygon
        let crosses = false;
        for (const e of newEdges) {
          const a = Math.min(e.u, e.v);
          const b = Math.max(e.u, e.v);
          if ((a < u && u < b && b < v) || (u < a && a < v && v < b)) {
            crosses = true;
            break;
          }
        }
        if (!crosses) {
          newEdges.push({ u, v, intersecting: false });
        }
      }
      attempts--;
    }

    // Scramble nodes
    const newNodes: Node[] = [];
    for (let i = 0; i < n; i++) {
      newNodes.push({
        id: i,
        x: 10 + Math.random() * 80, // 10% to 90%
        y: 10 + Math.random() * 80,
      });
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setGameState("PLAYING");
    
    // Initial check will happen in useEffect because nodes/edges state changed
  }, []);

  // --- Intersection Math ---
  const ccw = (A: Node, B: Node, C: Node) => {
    return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
  };

  const doIntersect = (A: Node, B: Node, C: Node, D: Node) => {
    return ccw(A, C, D) !== ccw(B, C, D) && ccw(A, B, C) !== ccw(A, B, D);
  };

  const updateIntersections = useCallback((currentNodes: Node[], currentEdges: Edge[]) => {
    let count = 0;
    const updatedEdges = currentEdges.map(e => ({ ...e, intersecting: false }));

    for (let i = 0; i < updatedEdges.length; i++) {
      for (let j = i + 1; j < updatedEdges.length; j++) {
        const e1 = updatedEdges[i];
        const e2 = updatedEdges[j];

        // Skip edges that share a vertex
        if (e1.u === e2.u || e1.u === e2.v || e1.v === e2.u || e1.v === e2.v) {
          continue;
        }

        const A = currentNodes[e1.u];
        const B = currentNodes[e1.v];
        const C = currentNodes[e2.u];
        const D = currentNodes[e2.v];

        if (doIntersect(A, B, C, D)) {
          e1.intersecting = true;
          e2.intersecting = true;
          count++; // Note: this counts pairs of intersections
        }
      }
    }

    setEdges(updatedEdges);
    setIntersectionsCount(count);
    return count;
  }, []);

  // Recalculate intersections whenever nodes move
  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      const count = updateIntersections(nodes, edges);
      
      // Check Win Condition
      if (count === 0 && gameState === "PLAYING" && draggingNode === null) {
        setGameState("LEVEL_CLEAR");
        
        // Update High Score if needed
        if (level > highScore) {
          setHighScore(level);
          localStorage.setItem("untangleHighScore", level.toString());
        }

        // Delay the popup or next level by 3 seconds so they can admire the solved puzzle
        setTimeout(() => {
          // Leaderboard check
          if (level > 0 && (leaderboard.length < 3 || level > leaderboard[leaderboard.length - 1].score)) {
            setShowNamePopup(true);
          } else {
            // Auto advance
            setLevel((l) => l + 1);
            generateLevel(level + 1);
          }
        }, 3000);
      }
    }
  }, [nodes, edges.length, updateIntersections, gameState, level, highScore, leaderboard, draggingNode]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const q = query(
        collection(db, "gameScores"),
        where("gameId", "==", "untangle"),
        orderBy("score", "desc"),
        limit(3)
      );
      const snapshot = await getDocs(q);
      const scores = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as GameScore)
      );
      setLeaderboard(scores);
    } catch (error) {
      console.warn("Index may be missing, falling back to local sort", error);
      try {
        const qFallback = query(
          collection(db, "gameScores"),
          where("gameId", "==", "untangle")
        );
        const snapshot = await getDocs(qFallback);
        const scores = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as GameScore)
        );
        scores.sort((a, b) => b.score - a.score);
        setLeaderboard(scores.slice(0, 3));
      } catch (fallbackError) {
        console.error("Error fetching leaderboard", fallbackError);
      }
    }
  }, []);

  useEffect(() => {
    const savedScore = localStorage.getItem("untangleHighScore");
    if (savedScore) setHighScore(parseInt(savedScore, 10));
    generateLevel(1);
    fetchLeaderboard();
  }, [generateLevel, fetchLeaderboard]);

  // --- Drag Logic ---
  const handlePointerDown = (e: React.PointerEvent, id: number) => {
    if (gameState !== "PLAYING") return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingNode(id);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggingNode === null || gameState !== "PLAYING" || !boardRef.current) return;
    
    const rect = boardRef.current.getBoundingClientRect();
    // Clamp to 5% - 95% to keep nodes fully visible inside the board
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    
    x = Math.max(5, Math.min(95, x));
    y = Math.max(5, Math.min(95, y));

    setNodes((prev) => 
      prev.map((n) => (n.id === draggingNode ? { ...n, x, y } : n))
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingNode !== null) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setDraggingNode(null);
    }
  };

  // --- Score Submission ---
  const submitScore = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const nameToSubmit = playerName.trim() || "Anonymous";
    try {
      await addDoc(collection(db, "gameScores"), {
        gameId: "untangle",
        playerName: nameToSubmit,
        score: level, // Score is the level cleared
        createdAt: serverTimestamp(),
      });
      setShowNamePopup(false);
      fetchLeaderboard();
      // Advance level
      setLevel((l) => l + 1);
      generateLevel(level + 1);
    } catch (error) {
      console.error("Error saving score", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const skipPopup = () => {
    setShowNamePopup(false);
    setLevel((l) => l + 1);
    generateLevel(level + 1);
  };

  const resetGame = () => {
    setLevel(1);
    generateLevel(1);
    setShowNamePopup(false);
  };

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.iconBox}>🕸️</div>
          <h1 className={styles.title}>Untangle</h1>
          <span className={styles.tag}>Geometry Puzzle</span>
        </div>
        <p className={styles.subtitle}>
          Drag the glowing nodes so that NO lines cross each other.
        </p>
      </header>

      <div className={styles.columns}>
        <div className={styles.leftCol}>
          <div className={styles.boardWrapper}>
            <div 
              className={`${styles.board} ${gameState === "LEVEL_CLEAR" ? styles.boardWin : ""}`}
              ref={boardRef}
              style={{ touchAction: "none" }}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <svg className={styles.svgOverlay} viewBox="0 0 100 100" preserveAspectRatio="none">
                {edges.map((e, idx) => {
                  const n1 = nodes[e.u];
                  const n2 = nodes[e.v];
                  if (!n1 || !n2) return null;
                  return (
                    <line
                      key={`e-${idx}`}
                      className={`${styles.edge} ${e.intersecting ? styles.edgeIntersect : styles.edgeSafe}`}
                      x1={n1.x}
                      y1={n1.y}
                      x2={n2.x}
                      y2={n2.y}
                    />
                  );
                })}
              </svg>

              {nodes.map((n) => (
                <div
                  key={`n-${n.id}`}
                  className={`${styles.node} ${draggingNode === n.id ? styles.nodeDragging : ""}`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  onPointerDown={(e) => handlePointerDown(e, n.id)}
                />
              ))}
            </div>

            {/* Level Clear Overlay */}
            {gameState === "LEVEL_CLEAR" && !showNamePopup && (
              <div className={styles.overlay} style={{ pointerEvents: "none" }}>
                <h3 style={{ color: "#00f2fe", textShadow: "0 0 15px rgba(0,242,254,0.8)" }}>
                  Level {level} Cleared!
                </h3>
              </div>
            )}

            {/* High Score Popup */}
            {showNamePopup && (
              <div className={styles.overlay}>
                <h3>New Global Record!</h3>
                <input
                  type="text"
                  className={styles.popupInput}
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={15}
                />
                <div className={styles.popupActions}>
                  <button className={styles.playButton} onClick={submitScore} disabled={isSubmitting}>
                    {isSubmitting ? "Transmitting..." : "Submit & Next Level"}
                  </button>
                  <button className={styles.skipButton} onClick={skipPopup} disabled={isSubmitting}>
                    Skip
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.tipSection}>
            <span className={styles.tipIcon}>✨</span>
            <span className={styles.tipText}>
              <strong>Tip:</strong> Nodes placed on the extreme outside edges usually help untangle the dense clusters in the center!
            </span>
          </div>
        </div>

        <div className={styles.rightCol}>
          {/* How to Play */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIconLight}>💡</span>
              <h4>Mission Briefing</h4>
            </div>
            <p className={styles.panelText}>
              Your goal is to untangle the web of glowing nodes. 
              <br /><br />
              <strong>1.</strong> Click and drag the glowing nodes around the screen.<br />
              <strong>2.</strong> Intersecting lines are shown in <span style={{color: '#ff003c'}}>Red</span>.<br />
              <strong>3.</strong> Rearrange the nodes until <strong>zero lines cross each other</strong>.<br />
              <br />
              When all lines are cyan, you've solved the puzzle!
            </p>
          </div>

          {/* Status Panel */}
          <div className={styles.panel}>
            <h4 className={styles.panelTitle}>System Status</h4>
            <div className={styles.statusGrid}>
              <div className={styles.statusItem}>
                <span className={styles.statusIcon}>🧬</span>
                <span className={styles.statusValue}>{level}</span>
                <span className={styles.statusLabel}>Current Level</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusIcon}>⚠️</span>
                <span className={`${styles.statusValue} ${intersectionsCount > 0 ? styles.statusValueRed : styles.statusValueGreen}`}>
                  {intersectionsCount}
                </span>
                <span className={styles.statusLabel}>Intersections</span>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusIcon}>🔵</span>
                <span className={styles.statusValue}>{nodes.length}</span>
                <span className={styles.statusLabel}>Nodes</span>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelIconGold}>🏆</span>
              <h4>Top Puzzle Solvers</h4>
            </div>
            <div className={styles.leaderboardList}>
              {leaderboard.length === 0 ? (
                <p className={styles.panelText}>No scores yet. Set the benchmark!</p>
              ) : (
                leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`${styles.leaderboardItem} ${
                      index === 0 ? styles.rank1 : index === 1 ? styles.rank2 : styles.rank3
                    }`}
                  >
                    <div className={styles.playerInfo}>
                      <span className={styles.rankBadge}>#{index + 1}</span>
                      <span>{entry.playerName}</span>
                    </div>
                    <span className={styles.leaderboardScore}>Lvl {entry.score}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <button className={styles.giveUpBtn} onClick={resetGame}>
            Restart from Level 1
          </button>
        </div>
      </div>
    </div>
  );
};

export default UntangleGame;
