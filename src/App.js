import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search.js'
import ListBookshelfs from './ListBookshelfs.js'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        books.map((book) => {
          if (book.shelf === 'currentlyReading') {
            this.addToCurrentlyReading(book)
          } else if (book.shelf === 'wantToRead') {
            this.addToWantToRead(book)
          } else if (book.shelf === 'read') {
            this.addToRead(book)
          }
        })
      })
  }

  addToCurrentlyReading = (book) => {
    book.shelf = 'currentlyReading'
    this.setState((prevState) => ({
      currentlyReading: prevState.currentlyReading.concat([book])
    }))
  }

  addToWantToRead = (book) => {
    book.shelf = 'wantToRead'
    this.setState((prevState) => ({
      wantToRead: prevState.wantToRead.concat([book])
    }))
  }

  addToRead = (book) => {
    book.shelf = 'read'
    this.setState((prevState) => ({
      read: prevState.read.concat([book])
    }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => <ListBookshelfs currentlyReading={this.state.currentlyReading} wantToRead={this.state.wantToRead} read={this.state.read} />} />
        <Route path='/search' render={() => <Search />} />
      </div>
    )
  }
}

export default BooksApp
