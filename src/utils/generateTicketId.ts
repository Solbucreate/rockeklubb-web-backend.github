export function generateTicketId(lastNumber: number): string {
  const next = lastNumber + 1;
  const padded = String(next).padStart(4, "0");
  return `LRK-${padded}`;
}
