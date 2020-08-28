import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf';
import { Route } from 'react-router-dom'

// values returned from server mapped to heading names
const SHELVES = {
  'currentlyReading': 'Currently Reading',
  'wantToRead': 'Want to Read',
  'read': 'Finished'
};

class App extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

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

    //TODO: prevent from "changing" to the same shelf

    const prevShelf = book.shelf;

    BooksAPI.update(book, newShelf).then(res => {

      book.shelf = newShelf;  // update the book object to show new shelf
      console.log(`Previous Shelf: ${prevShelf}\n New Shelf: ${book.shelf}`);

      // remove the book from it's previous shelf and add to the new shelf
      this.setState(currentState => ({
        [prevShelf]: currentState[prevShelf].filter(b => b.id !== book.id),
        [newShelf]: currentState[newShelf].concat([book])
      }))
    })
  }

  render() {

    return (
      <div className="App">

        <header className="App-header">
          <p>MyReads</p>
        </header>

        <div className="container">

          <Route exact path='/' render={() => (
              Object.entries(SHELVES).map(shelf => (
              <Shelf
                key={shelf[0]}
                shelfname={shelf[1]}
                shelfBooks={this.state[shelf[0]]}
                onShelfChange={this.onShelfChange}
              />
            ))
          )} />





        </div>

        <footer>
          &copy; Pretty Footer
      </footer>

      </div >
    )
  }
}

export default App;
