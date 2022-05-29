const express = require('express');
const path = require('path');
const fs = require('fs');

// Start Express Web Server Application
const app = express()
const port = 3001;

// Set up middleware stack
app.use(express.static('./public'));

app.get('/notes', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'notes.html'));
})

app.listen(port, () => {
    console.log(`Express Web Server Listening on localhost:${port}`);
})