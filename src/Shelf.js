import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const Shelf = (props) => {
    const { shelfBooks, shelfname } = props;

    return (
        <div>
            <h2>{shelfname}</h2>
            <ul className='shelf'>
                {shelfBooks.map(book => (
                    <Book
                        className='book'
                        key={book.id}
                        book={book}
                    ></Book>
                ))}
            </ul>
            <hr />
        </div>
    )
}

Shelf.propTypes = {
    shelfBooks: PropTypes.array.isRequired
}

export default Shelf
