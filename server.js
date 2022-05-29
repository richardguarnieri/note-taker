const express = require('express');
const path = require('path');
const fs = require('node:fs/promises');
const { v4: uuidv4 } = require('uuid');

// Import DB JSON
const dbNotesPath = './db/db2.json';
const dbNotes = require('./db/db2.json');

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
    res.status(200).json(dbNotes);
})

// POST /api/notes should receive a new note to save on the request 
// body, add it to the db.json file, and then return the new note 
// to the client

const writeFn = async (destination, content) => {
    try {
        await fs.writeFile(destination, JSON.stringify(content))
        console.log(`Data written to ${destination}`);
    } catch (err) {
        console.log(err);
    }
};

 const readAndWriteFn = async (filePath, data) => {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const contentParsed = JSON.parse(content);
        contentParsed.push(data);
        writeFn(filePath, contentParsed);
    } catch (err) {
        console.log(err);
    }
};



app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const note = {
        title,
        text,
        id: uuidv4()
    }
    readAndWriteFn(dbNotesPath, note);
    res.status(200).send();

    
});


// GET * should return the index.html file
app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, () => {
    console.log(`Express Web Server Listening on localhost:${port}`);
})