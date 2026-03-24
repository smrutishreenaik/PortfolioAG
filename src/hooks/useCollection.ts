import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";

export const useCollection = <T>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as T[];
        setData(results);
      } catch {
        // Fallback if index is missing or without orderBy
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          const results = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as T[];
          setData(results);
        } catch (fallbackErr: any) {
          setError(fallbackErr.message || "Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
};
