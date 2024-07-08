import React from 'react';
import './App.css';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Catalog</h1>
      </header>
      <main>
        <AddMovieForm />
        <MovieList />
      </main>
    </div>
  );
}

export default App;