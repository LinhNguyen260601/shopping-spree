/**
 * Get the id from a nameId
 * @param nameId - The nameId to get the id from
 * @returns The id from the nameId
 */
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i.')
  return arr[arr.length - 1]
}
