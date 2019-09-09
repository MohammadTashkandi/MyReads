import React from 'react'

class Book extends React.Component {

    state = {
        shelf: this.props.book.shelf
    }

    onChange = (e) => {
        e.preventDefault()
        this.props.moveBook(this.props.book, e.target.value, this.props.book.shelf)
    }

    render() {
        const { book } = this.props
        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks['thumbnail']})` }}></div>
                            <div className="book-shelf-changer">
                                <select onChange={this.onChange} value={this.state.shelf} name='shelf'>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>)
                                    <option value="wantToRead">Want to Read</option>)
                                    <option value="read">Read</option>)
                                    <option value="none" defaultValue>None</option>
                                </select>
                            </div>
                        </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors.map((author) => <p key={author}>{author}</p>)}</div>
                </div>
            </li>
        )
    }
}

export default Book