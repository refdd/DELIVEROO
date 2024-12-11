import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Festured menu category',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured  category name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description ',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'restaurant',
      type: 'array',
      title: 'Restaurant ',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    },
  ],
})
