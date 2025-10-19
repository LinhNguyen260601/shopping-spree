import { removeSpecialCharacter } from '@/utils/remove'

/**
 * Generate a nameId from a name and an id
 * @param name - The name to generate a nameId from
 * @param id - The id to generate a nameId from
 * @returns The nameId generated from the name and id
 */
export const generateNameId = ({ name, id }: { name: string; id: string }) =>
  removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
