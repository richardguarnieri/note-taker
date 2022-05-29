const express = require('express');
const path = require('path');
const fs = require('node:fs/promises');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

// Import DB JSON
const dbNotesPath = './db/db.json';
const dbNotes = require('./db/db.json');

console.log(dbNotes);

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


readFn = async (filePath) => {
    try {
        const notesArray = [];
        const currentNotes = await readFilePromise(filePath);
        console.log(currentNotes);
        // console.log(notesArray);
        // notesArray.push(currentNotes);
        // console.log(notesArray);
    } catch (err) {
        console.log(err);
    }
}


app.post('/api/notes', (req, res) => {
    // console.log(req.body);

    readFn(dbNotesPath);
    // const currentNotes = await fs.readFile(dbNotes)
    // console.log(currentNotes)
});


// GET * should return the index.html file
app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
})




app.listen(port, () => {
    console.log(`Express Web Server Listening on localhost:${port}`);
})