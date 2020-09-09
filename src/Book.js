import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
    }

    // Prevent selecting the current shelf book is already on
    disableShelfOption = (shelf, option) => {
        return (shelf === option);
    }

    render() {
        const { book, onChange } = this.props;
        //console.log(book);
        return (
            <li>
                <div className='book'>
                    <div className='book-top'>
                        <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                        </div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => onChange(book, e.target.value)} defaultValue={book.shelf || "move"}>
                                <option value="move" disabled>Move to...</option>
                                <option disabled={this.disableShelfOption(book.shelf, "currentlyReading")} value="currentlyReading">Currently Reading</option>
                                <option disabled={this.disableShelfOption(book.shelf, "wantToRead")} value="wantToRead">Want to Read</option>
                                <option disabled={this.disableShelfOption(book.shelf, "read")} value="read">Read</option>
                            </select>
                        </div>
                    </div>
                    <div className='book-title'>{book.title}</div>
                    <div className='book-authors'>{`${book.authors}`}</div>
                </div>
            </li >
        )
    }
}

export default Book