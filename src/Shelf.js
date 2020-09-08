import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const Shelf = (props) => {
    const { shelfBooks, shelfname , onShelfChange} = props;

    return (
        <div className='list-books-content'>
            <h2 className='shelf-title'>{shelfname}</h2>
            <ul className='shelf'>
                {shelfBooks.map(book => (
                    <Book
                        className='book'
                        key={book.id}
                        book={book}
                        onChange={onShelfChange}
                    ></Book>
                ))}
            </ul>
            <hr />
        </div>
    )
}

Shelf.propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    shelfname: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default Shelf
