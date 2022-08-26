import React, { useEffect, useState } from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { getAll, search, update } from "./BooksAPI";

export const BooksApp = () => {
  const [books, setBooks] = useState([]);
  const [showSearchPage, setShowSearchPage] = useState(false);

  // showSearchPage: false,

  async function getAllBooks() {
    const data = await getAll();
    setBooks(data);
    console.log({ data });
  }

  useEffect(() => {
    getAllBooks();
  }, []);

  console.log(books);
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => setShowSearchPage(false)}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={async () => {
                  let books = await search("Desai");
                  setBooks(books);
                }}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid" />
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <h2 className="bookshelf-title">Currently Reading</h2>
              {books
                .filter((book) => book.shelf == "currentlyReading")
                .map((book) => (
                  <div className="bookshelf">
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        <li>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${
                                    book.imageLinks.thumbnail
                                  })`,
                                }}
                              />
                              <div className="book-shelf-changer">
                                <select
                                  onChange={(e) => update(book, e.target.value)}
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.subtitle}</div>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                ))}

              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                {books
                  .filter((book) => book.shelf == "wantToRead")
                  .map((book) => (
                    <div className="bookshelf">
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      book.imageLinks.thumbnail
                                    })`,
                                  }}
                                />
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">
                                {book.subtitle}
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                {books
                  .filter((book) => book.shelf == "read")
                  .map((book) => (
                    <div className="bookshelf">
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      book.imageLinks.thumbnail
                                    })`,
                                  }}
                                />
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">
                                {book.subtitle}
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="list-books-content">
            <div>
              {books.filter((book) => book.shelf == "currentlyReading")
                .length !== 0 &&
                books
                  .filter((book) => book.shelf == "currentlyReading")
                  .map((book) => (
                    <>
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf">
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            <li>
                              <div className="book">
                                <div className="book-top">
                                  <div
                                    className="book-cover"
                                    style={{
                                      width: 128,
                                      height: 193,
                                      backgroundImage: `url(${
                                        book.imageLinks.thumbnail
                                      })`,
                                    }}
                                  />
                                  <div className="book-shelf-changer">
                                    <select
                                      onChange={(e) =>
                                        update(book, e.target.value)
                                      }
                                    >
                                      <option value="move" disabled>
                                        Move to...
                                      </option>
                                      <option value="currentlyReading">
                                        Currently Reading
                                      </option>
                                      <option value="wantToRead">
                                        Want to Read
                                      </option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                  {book.subtitle}
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </>
                  ))}

              <div className="bookshelf">
                {books
                  .filter((book) => book.shelf == "wantToRead")
                  .map((book) => (
                    <>
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf">
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            <li>
                              <div className="book">
                                <div className="book-top">
                                  <div
                                    className="book-cover"
                                    style={{
                                      width: 128,
                                      height: 193,
                                      backgroundImage: `url(${
                                        book.imageLinks.thumbnail
                                      })`,
                                    }}
                                  />
                                  <div className="book-shelf-changer">
                                    <select>
                                      <option value="move" disabled>
                                        Move to...
                                      </option>
                                      <option value="currentlyReading">
                                        Currently Reading
                                      </option>
                                      <option value="wantToRead">
                                        Want to Read
                                      </option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                  {book.subtitle}
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">NONE</h2>
                {books
                  .filter((book) => !book.shelf)
                  .map((book) => (
                    <div className="bookshelf">
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          <li>
                            <div className="book">
                              <div className="book-top">
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${
                                      book.imageLinks.thumbnail
                                    })`,
                                  }}
                                />
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    <option value="currentlyReading">
                                      Currently Reading
                                    </option>
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">
                                {book.subtitle}
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => setShowSearchPage(true)}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  );
};
