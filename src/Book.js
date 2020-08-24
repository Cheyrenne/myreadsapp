import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired
    }

    //TODO: Add onChange to <select> move shelf change up to main app

    render() {
        return (
            <li className='book'>
                <figure>
                    <img src={this.props.book.imageLinks.thumbnail} alt='book-cover' />
                    <figcaption>{this.props.book.title}</figcaption>
                    <p>{`${this.props.book.authors}`}</p>
                </figure>
                <div className="dropdown">
                    <select defaultValue="" className="shelf-select">
                        <option value="" disabled>Move to...</option>
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