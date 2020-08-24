import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf';
import {Route} from 'react-router-dom'

// values returned from server mapped to heading names
const SHELVES = {
  'currentlyReading': 'Currently Reading',
  'wantToRead': 'Want to Read',
  'read': 'Finished'
};

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
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
              shelfBooks={this.state.books.filter(b => b.shelf === shelf[0])}
              />
            ))
          )}/>

           

        </div>

        <footer>
          &copy; Pretty Footer
      </footer>

      </div >
    )
  }
}

export default App;
