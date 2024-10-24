import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useAppContext } from "../utils/AppContext";
import BookCard from './BookCard';

function ShowBookList() {
  const [books, setBooks] = useState([]);
  const { backendUrl } = useAppContext();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/books`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookList');
      });
  }, []);

  const bookList =
    books.length === 0
      ? 'there is no book record!'
      : books.map((book, k) => <BookCard book={book} key={k} />);

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Books List</h2>
          </div>
        </div>

        <div className='list'>{bookList}</div>
      </div>
    </div>
  );
}

export default ShowBookList;
