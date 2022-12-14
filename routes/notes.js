const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET route for retreiving all notes from database
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for adding a new note to database
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  // Sets the note's title, text, and randomly generates an id
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // Reads file, adds new data, writes new file
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE route for deleting notes from database
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Makes new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      res.json(`Note ${noteId} has been deleted`);
    });
});

module.exports = notes;