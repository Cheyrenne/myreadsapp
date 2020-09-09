import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
        currentBooks: PropTypes.array.isRequired
    }

    state = {
        query: '',
        bookMatches: []
    }

    handleChange = (e) => {
        const query = e.target.value;

        if (query !== '') {

            BooksAPI.search(query).then(res => {


                if (res['error']) {
                    this.setState({
                        bookMatches: [],
                    })
                }
                else {
                    this.setShelf(res); // show the shelf of any books already in the app
                    //console.log(res)
                    this.setState({
                        bookMatches: res,
                    })
                }
                //console.log("state: ", this.state.query)
                //console.log("query:", query)
            })
        }
        query === '' ?
            this.setState({
                query: '',
                bookMatches: []
            }) :
            this.setState({
                query: query
            });


    }

    // Show what shelf book is currently on in the app if it shows up in a search
    setShelf = (matches) => {
        this.props.currentBooks.forEach(book => {
            const match = matches.find(match => match.id === book.id);
            if (match !== undefined) {
                match.shelf = book.shelf;
            }
        });
    }

    render() {
        return (
            <div>
                <div className='search-books-bar'>
                    <Link to='/' className='close-search'>Back</Link>
                    <div className='search-books-input-wrapper'>
                        <input
                            value={this.state.query}
                            onChange={this.handleChange}
                            type='text' />
                    </div>
                </div>
                <div className="search-books-results">
                    <Shelf
                        shelfBooks={this.state.bookMatches}
                        shelfname='Search results'
                        onShelfChange={this.props.onShelfChange}
                    />
                </div>
            </div >
        )
    }
}

export default SearchBooks