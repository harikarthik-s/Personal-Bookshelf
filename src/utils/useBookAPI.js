import {API_URL} from './constants';
import { useState, useEffect } from "react";
import axios from "axios";

const useBooksAPI = (query) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.length > 2) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${API_URL}/search.json?q=${query}&limit=10&page=1`
          );
          setResults(response.data.docs);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBooks();
  }, [query]);

  const sortResultsByTitle = () => {
    setResults((prevResults) =>
      [...prevResults].sort((a, b) => a.title.localeCompare(b.title))
    );
  };

  const sortResultsByAuthor = () => {
    setResults((prevResults) =>
      [...prevResults].sort((a, b) =>
        a.author_name[0].localeCompare(b.author_name[0])
      )
    );
  };


  return { results, isLoading, sortResultsByTitle, sortResultsByAuthor };
};

export default useBooksAPI;