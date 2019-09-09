import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search.js'
import ListBookshelfs from './ListBookshelfs.js'

class BooksApp extends React.Component {

  // MARK: State

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  // MARK: Lifecycle methods

  componentDidMount() {
    this.getAllBooks()
  }

  // MARK: Custom functions

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        books.map((book) => this.addBookToShelf(book))
      })
  }

  addBookToShelf = (book) => {
    this.setState((prevState) => ({
      [book.shelf]: prevState[book.shelf].concat(book) //This will be: currentlyReading: prevState.currentlyReading.concat() (for example)
    }))
  }

  moveBook = (book, newShelf, prevShelf) => {
    BooksAPI.update(book, newShelf) //update the backend
      .then(() => {
        console.log('Moved')
      })
    book.shelf = newShelf //update the frontend

    if (newShelf === 'none') {
      this.setState((prevState) => ({
        [prevShelf]: prevState[prevShelf].filter((currentBook) => book.id !== currentBook.id),
      }))
    } else {
      this.setState((prevState) => ({
        [prevShelf]: prevState[prevShelf].filter((currentBook) => book.id !== currentBook.id),
        [newShelf]: prevState[newShelf].concat(book)
      }))
    }

  }

  // MARK: Render

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => <ListBookshelfs currentlyReading={this.state.currentlyReading} wantToRead={this.state.wantToRead} read={this.state.read} moveBook={this.moveBook} />} />
        <Route path='/search' render={() => <Search />} />
      </div>
    )
  }
}

export default BooksApp
