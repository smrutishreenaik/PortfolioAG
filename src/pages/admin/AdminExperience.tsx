import React, { useState, useEffect } from "react";
import { Table, Form, Modal, Card, Spinner } from "react-bootstrap";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { Experience } from "../../types";
import useToast from "../../context/useToast";
import ToastContainer from "../../components/ToastContainer";

const AdminExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [currentExp, setCurrentExp] = useState<Partial<Experience>>({});
  const [achievementsStr, setAchievementsStr] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toasts, showToast, dismissToast } = useToast();

  const expCollectionRef = collection(db, "experience");

  const fetchExperience = async () => {
    try {
      const data = await getDocs(expCollectionRef);
      setExperiences(
        data.docs.map(
          (document) => ({ ...document.data(), id: document.id }) as Experience,
        ),
      );
    } catch {
      showToast("Failed to load experience entries.", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchExperience();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrentExp({});
    setAchievementsStr("");
    setIsEditing(false);
  };

  const handleShow = (experience?: Experience) => {
    if (experience) {
      setCurrentExp(experience);
      setAchievementsStr(experience.achievements.join("\n"));
      setIsEditing(true);
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const achievements = achievementsStr
      .split("\n")
      .filter((achievement) => achievement.trim() !== "");

    try {
      if (isEditing && currentExp.id) {
        const expDoc = doc(db, "experience", currentExp.id);
        await updateDoc(expDoc, { ...currentExp, achievements });
        showToast("Experience updated successfully!", "success");
      } else {
        await addDoc(expCollectionRef, {
          ...currentExp,
          achievements,
          createdAt: new Date(),
        });
        showToast("Experience added successfully!", "success");
      }
      fetchExperience();
      handleClose();
    } catch {
      showToast("Error saving experience. Check Firestore rules.", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteTargetId(id);
    setShowConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteDoc(doc(db, "experience", deleteTargetId));
      showToast("Experience entry deleted.", "success");
      fetchExperience();
    } catch {
      showToast("Error deleting experience entry.", "error");
    } finally {
      setShowConfirmModal(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-white mb-0">Manage Experience</h3>
        <button className="btn btn-primary" onClick={() => handleShow()}>
          + Add Experience
        </button>
      </div>

      <Card className="bg-dark text-white border-secondary">
        <Card.Body>
          {isFetching ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading experience...</p>
            </div>
          ) : (
            <Table responsive variant="dark" hover>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Time Period</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">
                      No experience entries found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  experiences.map((experience) => (
                    <tr key={experience.id}>
                      <td>{experience.companyName}</td>
                      <td>{experience.role}</td>
                      <td>{experience.timePeriod}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-outline-info btn-sm me-2"
                          onClick={() => handleShow(experience)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => confirmDelete(experience.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={handleClose}
        contentClassName="bg-dark text-white"
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title>
            {isEditing ? "Edit Experience" : "Add New Experience"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Form.Group className="mb-3">
              <Form.Label>
                Company Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={100}
                value={currentExp.companyName || ""}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, companyName: e.target.value })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="e.g. Google"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Role / Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={100}
                value={currentExp.role || ""}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, role: e.target.value })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="e.g. Senior Frontend Engineer"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Time Period <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={currentExp.timePeriod || ""}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, timePeriod: e.target.value })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="e.g. Jan 2022 – Present"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Company Website <span className="text-muted">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="url"
                value={currentExp.companyWebsite || ""}
                onChange={(e) =>
                  setCurrentExp({
                    ...currentExp,
                    companyWebsite: e.target.value,
                  })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="https://..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Logo URL <span className="text-muted">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="url"
                value={currentExp.logoUrl || ""}
                onChange={(e) =>
                  setCurrentExp({ ...currentExp, logoUrl: e.target.value })
                }
                className="bg-transparent text-white border-secondary"
                placeholder="https://..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Achievements <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                required
                value={achievementsStr}
                onChange={(e) => setAchievementsStr(e.target.value)}
                className="bg-transparent text-white border-secondary"
                placeholder="One achievement per line"
              />
              <Form.Text className="text-muted">
                Enter each achievement on a new line.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-secondary">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Saving...
                </>
              ) : (
                "Save Experience"
              )}
            </button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        contentClassName="bg-dark text-white"
        centered
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this experience entry? This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminExperience;
