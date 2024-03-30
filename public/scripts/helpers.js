const categoriesQueries = require('../db/queries/categories');

const buildNote = (userId, content) => {
  const newNote = { user_id: userId, content: content};
  const categories = categoriesQueries.getAll()
  const categoryMapping = {
    'Watch': categories.find(category => category.name === 'Films/TV Shows'),
  }

  // auto-categorize the new note
  // logic to categorize...
  // const categorizedNote = autoCategorize(newNote)

  const category = categoryMapping['Watch']
  newNote.categoryId = category.id

  return newNote
}

module.exports = { buildNote }
