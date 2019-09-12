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
    read: [],
  }

  // MARK: Lifecycle methods

  componentDidMount() {
    this.getAllBooks()
  }

  // MARK: Custom functions

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          currentlyReading: [],
          wantToRead: [],
          read: [],
        }))
        const test = books.map((book) => this.addBookToShelf(book))
        console.log(test)
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
        
        // this.getAllBooks()

        // If you uncomment the above line and comment the lines 53-68 then the app will be a bit slower, but there is no possibility that
        // the data in the frontend and the backend will be different. because after every update you are retrieving the book from the database
      })
    book.shelf = newShelf //update the frontend

    if (newShelf === 'none') {
      this.setState((prevState) => ({
        [prevShelf]: prevState[prevShelf].filter((currentBook) => book.id !== currentBook.id),
      }))
    } else if (prevShelf === 'none') {
      this.setState((prevState) => ({
        [newShelf]: prevState[newShelf].concat(book)
      }))
    } else{
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
        <Route path='/search' render={() => <Search moveBook={this.moveBook} />} />
      </div>
    )
  }
}

export default BooksApp
