import { type SchemaTypeDefinition } from 'sanity'
import { projectTypes } from './projectType'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectTypes
  ],
}
