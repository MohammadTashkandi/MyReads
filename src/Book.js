import React from 'react'
import * as BooksAPI from './BooksAPI'
import picNotAvailable from './icons/picture-not-available.jpg'

class Book extends React.Component {

    state = {
        shelf: this.props.book.shelf
    }

    componentDidMount() {
        if (!this.props.book.shelf) { //The search api doesn't return book.shelf. So here we check if the book object has shelf property.
            // yes? the shelf state will be assigned to it from the props. No? we will get the shelf from the get api
            this.getBookInfo()
        }
    }

    getBookInfo = () => {
        BooksAPI.get(this.props.book.id)
            .then((book) => {
                this.setState(() => ({
                    shelf: book.shelf
                }))
            })
    }

    onChange = (e) => {
        e.persist()

        const prevShelf = this.state.shelf
        this.props.moveBook(this.props.book, e.target.value, prevShelf)

        this.setState(() => ({
            shelf: e.target.value
        }))
    }

    render() {
        const { book } = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128, height: 193,
                            backgroundImage: book.imageLinks ? (`url(${book.imageLinks['thumbnail']})`) : (`url(${picNotAvailable})`)
                            //Some books don't have images. This is to avoid that bug.
                        }}>
                        </div>
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
                    <div className="book-authors">
                        {
                            book.authors ? (book.authors.map((author) => <p key={author}>{author}</p>)) : (<p>Unknown</p>)
                        }
                    </div>
                </div>
            </li>
        )
    }
}

export default Book