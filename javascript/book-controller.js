'use strict'

function onInit() {
  renderBooks();
}

function renderBooks() {
  var books = getBooksForDisplay();
  var strHTMLs = books.map(function (book) {
    return `<tr>
             <td data-trans="${book.name}">${book.id}</td><td>${book.name}</td> <td>${book.price}</td>
             <td><img src="img/${book.imgUrl}.jpg"/> </td>
             <td>${book.rate}</td>
             <td><button onclick="onReadBook('${book.id}')" data-trans="read">Read</button></td>
             <td><button onclick="onUpdateBook('${book.id}')" data-trans="update">Update</button></td>
             <td><button class="btn-remove-book" onclick="onRemoveBook('${book.id}')" data-trans="delete">Delete</button></td>
             </tr>`
  })
  document.querySelector('.books-display').innerHTML = strHTMLs.join('')
  doTrans();

}

function onRemoveBook(bookId) {
  deleteBook(bookId);
  renderBooks();
}

function onAddBook() {
  var elTitle = document.querySelector('input[name=title]');
  var elPrice = document.querySelector('input[name=price]');
  if (!elTitle.value || elPrice === '') return;
  addBook(elTitle.value, elPrice.value);
  renderBooks();
  // var elSpan = document.querySelector('.book-added');
  // elSpan.innerText = 'book added';
  var elHeadLine = document.querySelector('#head-line');
  elHeadLine.classList.add('animate__animated', 'animate__bounce');
  console.log(elHeadLine.classList);
  elTitle.value = '';
  elPrice.value = '';
  setTimeout(function () {
    // elSpan.innerText = ''
    elHeadLine.classList.remove('animate__animated', 'animate__bounce');
  }, 2100)
}

function onUpdateBook(bookId) {
  var updateModal = document.querySelector('.modal-update-price');
  updateModal.hidden = false;
  var elBtn = document.querySelector('.modal-update-price button');
  elBtn.name = `${bookId}`;
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elModal = document.querySelector('.modal123');

  elModal.innerHTML = `
      <h5 data-trans="${book.name}">${book.name}</h5>
      <h6><img src="img/${book.imgUrl}.jpg"/></h6>
      <p>${book.desc}</p>
      <button onclick="onChangeRate('${bookId}','+')">+</button><span class="book-rate">${book.rate}</span><button onclick="onChangeRate('${bookId}','-')">-</button>
      <div></div>
      <button onclick="onCloseModal()" data-trans="close">Close</button>`
  elModal.hidden = false;
  doTrans();
}

function onCloseModal() {
  document.querySelector('.modal123').hidden = true;
}

function onChangeRate(bookId, elbtnVal) {
  var op = elbtnVal;
  var elRate = document.querySelector('.book-rate');
  elRate.innerText = changeRate(bookId, op);
  renderBooks();
}

function onUpdatePrice() {
  var elUpdateModal = document.querySelector('.modal-update-price');
  var elPriceInput = document.querySelector('input[name=newPrice]');
  var elBtn = document.querySelector('.modal-update-price button');
  var newPrice = +elPriceInput.value;
  if (isNaN(newPrice)) return;
  updateBook(elBtn.name, newPrice);
  renderBooks();
  elUpdateModal.hidden = true;

}

function onSortByName() {
  sortByName();
  renderBooks();
}

function onSortByPrice() {
  sortByPrice();
  renderBooks();
}

function onNextPage() {
  nextPage();
  renderBooks();
}

function onPrevPage() {
  prevPage();
  renderBooks();
}

function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
  doTrans();
  renderBooks();
}