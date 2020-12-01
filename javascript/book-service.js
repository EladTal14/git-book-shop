'use strict'
const KEY = 'Books'
const PAGE_SIZE = 4;
var gBooks = [];
var gPageIdx = 0;
_createBooks();
var gSortBy;

function createBook(name = 'no-name-starter', price = getRandomIntInclusive(0, 200), imgUrl = 'no image') {
  return {
    id: makeId(),
    name,
    price,
    imgUrl,
    desc: makeLorem(),
    rate: 0
  };

}

function _createBooks() {
  var books = loadFromStorage(KEY)
  if (!books || !books.length) {
    books = []
    books.push(createBook('harry potter 1', 300, 'harry potter 1'))
    books.push(createBook('harry potter 2', 240, 'harry potter 2'))
    books.push(createBook('harry potter 5', 260, 'harry potter 5'))
  }
  gBooks = books;
  _saveBooksToStorage();
  gBooks = books;
}

function getBooksForDisplay() {
  var idxStart = gPageIdx * PAGE_SIZE;
  var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE)
  return books;
}

function deleteBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  })
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();

}

function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

function addBook(name, price) {
  gBooks.push(createBook(name, price))
  _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  })
  gBooks[bookIdx].price = newPrice;
  _saveBooksToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return bookId === book.id;
  })
  return book;
}

function changeRate(bookId, elbtnVal) {
  var book = getBookById(bookId);
  if (book.rate === 0 && elbtnVal === '-') return book.rate;
  if (book.rate === 10 && elbtnVal === '+') return book.rate;
  book.rate = (elbtnVal === '+') ? book.rate + 1 : book.rate - 1;
  _saveBooksToStorage();
  return book.rate;
}

function sortByName() {
  gBooks.sort(function (book1, book2) {
    var book1Name = book1.name
    var book2Name = book2.name
    return book1Name.localeCompare(book2Name)
  })
  _saveBooksToStorage();
}

function sortByPrice() {
  gBooks.sort(function (book1, book2) {
    var book1Price = book1.price
    var book2Price = book2.price
    return book1Price - book2Price
  })
  _saveBooksToStorage();
}

function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;

}

function prevPage() {
  gPageIdx--;
  if (gPageIdx < 0) gPageIdx = Math.floor((gBooks.length - 1) / PAGE_SIZE);

}