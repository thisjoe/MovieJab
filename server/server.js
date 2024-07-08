const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.post('/api/saveMovie', (req, res) => {
    const movie = req.body;
    const filePath = path.join(__dirname, 'movies.txt');

    const fileContent = JSON.stringify(movie) + "\n"; // Convert movie object to string and add a newline

    fs.appendFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error saving the movie:', err);
            res.status(500).send('Error saving the movie');
            return;
        }
        res.send('Movie saved successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});