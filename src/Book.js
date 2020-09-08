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
        const {book, onChange} = this.props;
        //console.log(book);
        return (
            <li className='book'>

                <figure>
                    <img src={this.props.book.imageLinks.thumbnail} alt='book-cover' />
                    <figcaption>{this.props.book.title}</figcaption>
                    <p>{`${this.props.book.authors}`}</p>
                </figure>
                <div className="dropdown">
                    <select onChange={(e) => onChange(book, e.target.value)} defaultValue={book.shelf || "move"} className="shelf-select">
                        <option value="move" disabled>Move to...</option>
                        <option disabled={this.disableShelfOption(book.shelf, "currentlyReading")} value="currentlyReading">Currently Reading</option>
                        <option disabled={this.disableShelfOption(book.shelf, "wantToRead")} value="wantToRead">Want to Read</option>
                        <option disabled={this.disableShelfOption(book.shelf, "read")} value="read">Read</option>
                    </select>
                </div>
            </li>
        )
    }
}

export default Book