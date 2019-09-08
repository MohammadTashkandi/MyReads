import React from 'react'
import Bookshelf from './Bookshelf.js'
import { Link } from 'react-router-dom'

class ListBookshelfs extends React.Component {
    render() {
        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content"> {/* Make dynamic */}
                <Bookshelf />
                <Bookshelf />
                <Bookshelf />
              </div>
              <div className="open-search">
                <Link to='/search' className='open-search'><button>Add a book</button></Link>
              </div>
            </div>
        )
    }
}

export default ListBookshelfs