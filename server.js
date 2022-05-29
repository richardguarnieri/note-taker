const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Path to the JSON "database"
const dbPath = './db/db2.json';

// Start Express Web Server Application
const app = express()
const port = 3001;

// Set up middleware stack
app.use(express.static('./public'));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'notes.html'));
})

// GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
    res.status(200).json(data);
})

// POST /api/notes should receive a new note to save on the request 
// body, add it to the db.json file, and then return the new note 
// to the client
app.post('/api/notes', (req, res) => {
    const note = req.body;
    note.id = uuidv4();
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
    data.push(note);
    fs.writeFileSync(dbPath, JSON.stringify(data));
    console.log(`${JSON.stringify(note)} has been sucessfully added to JSON file`);
    res.status(200).json(data);
});

// GET * should return the index.html file
app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})