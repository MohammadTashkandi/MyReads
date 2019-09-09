import React from 'react'
import Book from './Book.js'

class Bookshelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid"> {/* make dynamic */}
                        {
                            this.props.books.map((book) => <Book key={book.id} book={book} moveBook={this.props.moveBook} />)
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf