const express = require('express');
const path = require('path');
const fs = require('fs');

// Import DB JSON
const dbNotes = require('./db/db.json');

// Start Express Web Server Application
const app = express()
const port = 3001;

// Set up middleware stack
app.use(express.static('./public'));

// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'notes.html'));
})

// GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.status(200).json(dbNotes);
})




// GET * should return the index.html file
app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
})




app.listen(port, () => {
    console.log(`Express Web Server Listening on localhost:${port}`);
})