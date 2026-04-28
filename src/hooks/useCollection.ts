import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { sortByDisplayOrder } from "../utils/firestoreOrdering";

type CollectionItem = {
  createdAt?: Date | number | string | null | { toDate?: () => Date };
  order?: number | null;
};

export const useCollection = <T extends CollectionItem>(
  collectionName: string,
) => {
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
        })) as unknown as T[];
        setData(sortByDisplayOrder(results));
      } catch {
        // Fallback if index is missing or without orderBy
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          const results = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as unknown as T[];
          setData(sortByDisplayOrder(results));
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
