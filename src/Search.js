import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Search extends React.Component {

    state = {
        search: '',
        searchResult: [],
    }

    handleChange = (e) => {
        e.persist()

        this.setState(() => ({
            [e.target.name]: e.target.value
        })) 
        
        BooksAPI.search(e.target.value)
            .then((books) => {
                console.log(books)
                this.setState(() => ({
                    searchResult: books
                }))
            })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className='close-search'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input onChange={this.handleChange} type="text" name='search' value={this.state.search} placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchResult.map((book) => (<Book key={book.id} book={book} moveBook={this.props.moveBook} />))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search