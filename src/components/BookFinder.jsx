import React, { useState, useEffect } from "react";
import useBooksAPI from "../utils/useBookAPI";
import '../css/BookFinder.css';
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const BookFinder = () => {
  const [query, setQuery] = useState('');
  const [library, setLibrary] = useState([]);
  const { results, isLoading, sortResultsByTitle, sortResultsByAuthor } = useBooksAPI(query);

  useEffect(() => {
    const savedLibrary = JSON.parse(localStorage.getItem('library') || '[]');
    setLibrary(savedLibrary);
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const isBookInLibrary = (book) => {
    return library.find((libBook) => libBook.key === book.key);
  };

  const handleAddToLibrary = (book) => {
    if (!isBookInLibrary(book)) {
      const updatedLibrary = [...library, book];
      setLibrary(updatedLibrary);
      localStorage.setItem('library', JSON.stringify(updatedLibrary));
    }
  };

  return (
    <div>
      <div className='nav'>
        <h1 className='project-name'>MY LIBRARY</h1>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search for a book.."
          className='input-search'
        />
        <Link to={'/'}><button onClick={() => window.location.href = '/library'} className='search-button'>View Library</button></Link>
      </div>

      {isLoading ? (
        <Shimmer />
        // <p>Searching..</p>
      ) : (
        <div className='results-section'>
          <div className="actions">
            <button onClick={sortResultsByTitle}>Sort by Title</button>
            <button onClick={sortResultsByAuthor}>Sort by Author</button>
          </div>
          <p>Showing {results.length} results for "{query}"</p>
          <div className='results'>
            {results.map((book) => (
              <div key={book.key} className='card'>
                <h2>{book.title}</h2>
                {book.author_name && <p><strong>Author: </strong>{book.author_name[0]}</p>}
                <p><strong>Edition Count: </strong>{book.edition_count}</p>
                <button
                  onClick={() => handleAddToLibrary(book)}
                  className={isBookInLibrary(book) ? 'already-in-library' : 'add-to-library'}
                >
                  {isBookInLibrary(book) ? 'Already in the Library' : 'Add to Library'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookFinder;