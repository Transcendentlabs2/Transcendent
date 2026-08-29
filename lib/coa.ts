export type CoaRecord = {
  lot: string;
  productName: string;
  productSlug?: string;
  purity?: string;
  analysisDate?: string;
  status: "VERIFIED" | "PENDING" | "REJECTED";
  methods: string[];
  laboratory?: string;
  coaUrl?: string;
  notes?: string;
};

/**
 * Public COA records.
 *
 * IMPORTANT: Only publish records that are backed by real lot-specific
 * analytical documentation. Do not add demo, placeholder or invented lots.
 */
export const COA_RECORDS: CoaRecord[] = [];

export function normalizeLot(value: string) {
  return value.trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
}

export function findCoaByLot(lot: string) {
  const normalized = normalizeLot(lot);
  return COA_RECORDS.find((record) => normalizeLot(record.lot) === normalized) ?? null;
}

export function getPublishedCoas() {
  return COA_RECORDS.filter((record) => record.status === "VERIFIED");
}
