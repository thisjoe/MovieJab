import React, { useState } from 'react';

const AddMovieForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [director, setDirector] = useState('');
    const [studio, setStudio] = useState('');
    const [format, setFormat] = useState('');
    const [nextId, setNextId] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newMovie = { id: nextId, title, year, studio, format };
    
        fetch('http://localhost:3001/api/saveMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
            })
            .then(data => {
            console.log('Success:', data);
            setNextId(nextId + 1);
            })
            .catch((error) => {
            console.error('Error:', error.message);
            });
    };

    return (
        <div>
        <h2>Add a New Movie</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
                type="text"
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="director">Director:</label>
            <input
                type="text"
                id="director"
                name="director"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="studio">Studio:</label>
            <input
                type="text"
                id="studio"
                name="studio"
                value={studio}
                onChange={(e) => setStudio(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="format">Format:</label>
            <input
                type="text"
                id="format"
                name="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
            />
        </div>
            <button type="submit">Add Movie</button>
        </form>
        </div>
        );
    };

export default AddMovieForm;