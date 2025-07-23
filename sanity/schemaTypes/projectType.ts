import {defineField, defineType} from 'sanity'

export const projectTypes = defineType({
  name: 'Project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'tech',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
        name:'link',
        type:'string'
    })
  ],
})