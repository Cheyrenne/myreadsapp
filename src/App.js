import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf';
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'

// values returned from server mapped to heading names
const SHELVES = {
  currentlyReading: 'Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
};

class App extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  // filter current books into arrays based on current shelf
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        currentlyReading: books.filter(b => b.shelf === 'currentlyReading'),
        wantToRead: books.filter(b => b.shelf === 'wantToRead'),
        read: books.filter(b => b.shelf === 'read')
      }))
    })
  }

  onShelfChange = (book, newShelf) => {

    const prevShelf = book.shelf === undefined ? '' : book.shelf;

    BooksAPI.update(book, newShelf).then(res => {

      book.shelf = newShelf;  // update the book object to show new shelf
      
      // Remove book
      if (newShelf === 'remove') {
        delete(book.shelf);
        this.setState(currentState => ({
          [prevShelf]: currentState[prevShelf].filter(b => b.id !== book.id)
        }));
      }

      // Remove the book from it's previous shelf and add to the new shelf
      else if (prevShelf !== '') {
        this.setState(currentState => ({
          [prevShelf]: currentState[prevShelf].filter(b => b.id !== book.id),
          [newShelf]: currentState[newShelf].concat([book])
        }));
      }

      // Add book from the search page, which has no previous shelf
      else {
        this.setState(currentState => ({
          [newShelf]: currentState[newShelf].concat([book])
        }));
      }
    })
  }

  render() {

    return (
      <div className="App">
        <div className="container">

          {/* Root/home page */}
          <Route exact path='/' render={() => (
            <div>
              <header className="app-header">
                <p>MyReads</p>
              </header>
              {Object.entries(SHELVES).map(shelf => (
                <Shelf
                  key={shelf[0]}
                  shelfname={shelf[1]}
                  shelfBooks={this.state[shelf[0]]}
                  onShelfChange={this.onShelfChange}
                />
              ))}
              <div className='open-search'>
                <Link to='/search'>Search</Link>
              </div>
            </div>

          )} />

          {/* Search page*/}
          <Route path='/search' render={() => (
            <SearchBooks
              onShelfChange={this.onShelfChange}
              currentBooks={this.state.currentlyReading.concat(this.state.wantToRead,this.state.read)}
            />
          )}
          />
        </div>
      </div>
    )
  }
}

export default App;
