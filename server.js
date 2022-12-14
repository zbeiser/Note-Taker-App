const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON responses, urlencoded data, prepending api to routes, 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// Get route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route redirects to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Tells where to listen for the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);