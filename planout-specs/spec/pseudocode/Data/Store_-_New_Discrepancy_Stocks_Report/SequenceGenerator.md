/**
 * Generates a sequential code for the document reference.
 */
async function generateSequence(tx, prefix, entityCode) {
  // Logic to fetch current max sequence for the specific entity and prefix
  // and increment it by 1.
  const lastDoc = await tx.discrepancy_stocks.findFirst({
    where: { document_ref: { startsWith: `${prefix}/${entityCode}/` } },
    orderBy: { created_at: 'desc' }
  });
  
  const currentSeq = lastDoc ? parseInt(lastDoc.document_ref.split('/').pop()) : 0;
  return (currentSeq + 1).toString().padStart(4, '0');
}