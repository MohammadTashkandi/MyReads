import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Search extends React.Component {
    
    // MARK: State

    state = {
        search: '',
        searchResult: [],
    }

    // MARK: Custom functions

    handleChange = (e) => {
        e.persist()

        this.setState(() => ({
            [e.target.name]: e.target.value
        }))

        if (e.target.value === '') {
            this.setState(() => ({
                searchResult: []
            }))
        } else {
            BooksAPI.search(e.target.value)
                .then((books) => {
                    if(this.state.search !== '') { //this will prevent the scenario where the api returns books after the user is done deleting the query
                        this.setState(() => ({
                            searchResult: books && books.constructor === Array ? (books) : (null) //When the search doesn't find a book it returns an object. If its an array then it found a book.
                            //So that line is for checking if books is an array. yes? assign to state. No? put null and the code below will render a message
                            // variable.contructor doesn't work if the variable is null. So you have to check first
                        }))
                    }
                })
        }

    }

    // MARK: Render

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            onChange={this.handleChange}
                            type="text" name='search'
                            value={this.state.search}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchResult ? (
                                this.state.searchResult.map((book) => (<Book key={book.id} book={book} moveBook={this.props.moveBook} />))
                            ) : (
                                    <h2>No books found</h2>
                                )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search