import React, { useEffect, useState } from 'react';
import '../css/ViewLibrary.css';
import { Link } from 'react-router-dom';

const LibraryPage = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const storedLibrary = JSON.parse(localStorage.getItem('library') || '[]');
    setLibrary(storedLibrary);
  }, []);

  const removeFromLibrary = (book) => {
    const updatedLibrary = library.filter((b) => b.key !== book.key);
    setLibrary(updatedLibrary);
    localStorage.setItem('library', JSON.stringify(updatedLibrary));
  };

  return (
    <div>
      <div className='nav'>
        <h1 className='project-name'>MY BOOKS</h1>
        <Link to={'/'}><button className='search-button'>Search Books</button></Link>
      </div>
    <div className='library-container'>
      
      <div className='library-results'>
        {library.map((book) => (
          <div key={book.key} className='card'>
            <h2>{book.title}</h2>
            {book.author_name && <p><strong>Author: </strong>{book.author_name[0]}</p>}
            <p><strong>Edition Count: </strong>{book.edition_count}</p>
            <button className="remove-button" onClick={() => removeFromLibrary(book)}>Remove from Library</button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default LibraryPage;
