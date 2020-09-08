import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
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
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                    </select>
                </div>
            </li>
        )
    }
}

export default Book