import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf';
import { search } from './BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        onShelfChange: PropTypes.func.isRequired
    }
    
    state = {
        query: '',
        bookMatches: []
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
        search(this.state.query).then(books => {
            this.setState({
                bookMatches: books
            })
        })
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
                <Shelf
                    shelfBooks={this.state.bookMatches}
                    shelfname='Search results'
                    onShelfChange={this.props.onShelfChange}
                />
            </div>
        )
    }
}

export default SearchBooks
