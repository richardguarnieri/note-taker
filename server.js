const express = require('express');
const fs = require('fs');

// Start Express Web Server Application
const app = express()
const port = 3001;

// Set up middleware stack
app.use(express.static('/public'));


app.listen(port, () => {
    console.log(`Express Web Server Listening on localhost:${port}`);
})