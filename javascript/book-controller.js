'use strict'

function onInit() {
  renderBooks();
}

function renderBooks() {
  var books = getBooksForDisplay();
  var strHTMLs = books.map(function (book) {
    return `<tr>
             <td>${book.id}</td><td>${book.name}</td> <td>${book.price}</td>
             <td><img src="img/${book.imgUrl}.jpg"/> </td>
             <td>${book.rate}</td>
             <td><button class="btn btn-outline-info" onclick="onReadBook('${book.id}')" data-trans="read" data-toggle="modal" data-target="#exampleModalCenter" >Read</button></td>
             <td><button class="btn btn-outline-success" onclick="onUpdateBook('${book.id}')" data-trans="update">Update</button></td>
             <td><button class="btn-remove-book btn btn-outline-danger" onclick="onRemoveBook('${book.id}')" data-trans="delete">Delete</button></td>
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
  var elHeadLine = document.querySelector('#head-line');
  elHeadLine.classList.add('animate__animated', 'animate__heartBeat');
  elTitle.value = '';
  elPrice.value = '';
  setTimeout(function () {
    elHeadLine.classList.remove('animate__animated', 'animate__heartBeat');
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
  var elModal = document.querySelector('#exampleModalCenter')
  elModal.innerHTML = `
<div class="modal-dialog modal-dialog-centered" role="document">
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLongTitle">${book.name}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    <h6><img src="img/${book.imgUrl}.jpg"/></h6>
  <p>${book.desc}</p>
  </div>
  <div class="modal-footer">
  <button class="btn-primary ml-3" onclick="onChangeRate('${bookId}','+')">+</button><span class="book-rate ml-3">${book.rate}</span><button class="btn-primary ml-3" onclick="onChangeRate('${bookId}','-')">-</button>
  <button data-trans="close" class="btn-warning mt-1" data-dismiss="modal">Close</button>
  </div>
</div>
</div>
`
  doTrans();
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
  var elTable = document.querySelector('table')
  elTable.classList.add('animate__animated', 'animate__zoomIn')
  setTimeout(function () {
    elTable.classList.remove('animate__animated', 'animate__zoomIn')
  }, 1000)
  console.log(elTable);
}

function onPrevPage() {
  prevPage();
  renderBooks();
  var elTable = document.querySelector('table')
  elTable.classList.add('animate__animated', 'animate__zoomIn')
  setTimeout(function () {
    elTable.classList.remove('animate__animated', 'animate__zoomIn')
  }, 1000)

}

function onSetLang(lang) {
  setLang(lang);
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
  doTrans();
  renderBooks();
}