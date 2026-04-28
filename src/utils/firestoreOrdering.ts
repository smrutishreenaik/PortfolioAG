type FirestoreLikeTimestamp = {
  seconds?: number;
  nanoseconds?: number;
  toDate?: () => Date;
};

type FirestoreRecord = {
  createdAt?: FirestoreLikeTimestamp | Date | number | string | null;
  order?: number | null;
};

const getOrderValue = (order: FirestoreRecord["order"]) =>
  typeof order === "number" && Number.isFinite(order)
    ? order
    : Number.MAX_SAFE_INTEGER;

const getCreatedAtValue = (createdAt: FirestoreRecord["createdAt"]) => {
  if (!createdAt) return 0;

  if (typeof createdAt === "number") return createdAt;

  if (typeof createdAt === "string") {
    const parsed = Date.parse(createdAt);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  if (createdAt instanceof Date) return createdAt.getTime();

  if (typeof createdAt === "object") {
    if (typeof createdAt.toDate === "function") {
      return createdAt.toDate().getTime();
    }

    if (typeof createdAt.seconds === "number") {
      return (
        createdAt.seconds * 1000 +
        Math.floor((createdAt.nanoseconds ?? 0) / 1_000_000)
      );
    }
  }

  return 0;
};

export const sortByDisplayOrder = <T extends FirestoreRecord>(items: T[]) =>
  [...items].sort(
    (a, b) =>
      getOrderValue(a.order) - getOrderValue(b.order) ||
      getCreatedAtValue(b.createdAt) - getCreatedAtValue(a.createdAt),
  );
