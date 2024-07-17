const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3050;
const MONGO_URL = 'mongodb://db:27017/moviedb';
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

let db;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
    })
    .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
    });

app.post('/api/saveMovie', async (req, res) => {
    try {
    const movie = req.body;
    const result = await db.collection('movies').insertOne(movie);
    console.log('Movie saved:', result.insertedId);
    res.status(201).json({ message: 'Movie saved successfully', id: result.insertedId });
    } catch (error) {
    console.error('Error saving movie:', error);
    res.status(500).json({ message: 'Error saving movie' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });