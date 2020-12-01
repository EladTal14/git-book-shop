'use strict'
var gTrans = {
  'book-shop': {
    en: 'Book Shop',
    es: 'Tienda de libros',
    he: 'הספריה'
  },
  'placeholder-title': {
    en: 'Title',
    es: 'Título',
    he: 'שם הספר',
  },
  'price': {
    en: 'Price',
    es: 'Precio',
    he: 'מחיר',
  },
  'filter-active': {
    en: 'Active',
    es: 'Activo',
    he: 'פעיל'
  },
  'add': {
    en: 'Add',
    es: 'Añadir',
    he: 'הוסף',
  },
  'id': {
    en: 'Id',
    es: 'Identidad',
    he: 'מק"ט',
  },
  'book-picture': {
    en: 'Book picture',
    es: 'Imagen del libro',
    he: 'תמונה',
  },
  'rate': {
    en: 'Rate',
    es: 'Estas Seguru?',
    he: 'מחיר',
  },
  'actions': {
    en: 'Actions',
    es: 'comportamiento',
    he: 'פעולות'
  },
  'title': {
    en: 'Title',
    es: 'Título',
    he: 'שם הספר'
  },
  'prev-page': {
    en: 'Prev Page',
    es: 'Pagina anterior',
    he: 'עמוד קודם'
  },
  'next-page': {
    en: 'next Page',
    es: 'siguiente página',
    he: 'עמוד הבא'
  },
  'read': {
    en: 'Details',
    es: 'Detalles',
    he: 'פרטים'
  },
  'update': {
    en: 'Update',
    es: 'actualizar',
    he: 'עדכן'
  },
  'delete': {
    en: 'Delete',
    es: 'Eliminar',
    he: 'מחק'
  },
  'new-price': {
    en: 'New Price',
    es: 'nuevo precio',
    he: 'מחיר חדש'
  },
  'close': {
    en: 'Close',
    es: 'cerrar',
    he: 'סגור'
  }
}
var gCurrLang = 'en';

function getTrans(transKey) {
  var keyTrans = gTrans[transKey]
  if (!keyTrans) return 'UNKNOWN'

  var txt = keyTrans[gCurrLang]
  if (!txt) txt = keyTrans.en

  return txt
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]')
  els.forEach(function (el) {
    var transKey = el.dataset.trans
    var txt = getTrans(transKey)
    if (el.nodeName === 'INPUT') {
      // el.setAttribute('placeholder', txt)
      // THE SAME!
      el.placeholder = txt
    } else {
      el.innerText = txt
    }
  })
}

function setLang(lang) {
  gCurrLang = lang;
}

function formatNumOlder(num) {
  return num.toLocaleString('es')
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
  return new Intl.NumberFormat(gCurrLang, {
    style: 'currency',
    currency: 'ILS'
  }).format(num);
}

// function formatDate(time) {

//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   };

//   return new Intl.DateTimeFormat(gCurrLang, options).format(time);
// }