'use strict'
const body = document.body
const date = document.getElementById('date')
const contentEl = document.querySelector('.content')
const contentBoxAll = document.querySelectorAll('.content__box')
const contentBoxFirst = document.querySelector('.content__box--1')
const contentBoxSecond = document.querySelector('.content__box--2')
const contentButtonClose = document.querySelector('.content__button-close')
//
const userName = document.getElementById('user--username')
const userCode = document.getElementById('user--code')
const userMovement = document.getElementById('user--movement')
const userDate = document.getElementById('user--date')
const userDaysPassed = document.getElementById('user--days-passed')
//
const option = {
  day: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

const optionMon = {
  day: 'numeric',
  month: 'long',
}

const optionClock = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

const acc1 = {
  n: 'J',
  d0: [200, 150],
  d1: [new Date(2024, 5, 4), new Date('2020')],
  en: 1101,
}

const acc2 = {
  n: 'P',
  d0: [700, 12250, 200],
  d1: [new Date(2024, 5, 4), new Date(2024, 3, 4), new Date('2024')],
  en: 2262,
}
const acc3 = {
  n: 'P',
  d0: [700, 12250, 200],
  d1: [...acc2.d1],
  en: 1445,
}
const acc4 = {
  n: 'E',
  d0: [200, 150],
  d1: [...acc1.d1],
  en: 9245,
}
const acc5 = {
  n: 'O',
  d0: [200, 150, 700, 1450, 100, 53],
  d1: [...acc1.d1],
  en: 7284,
}
const acc6 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc7 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc8 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc9 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc10 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc11 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc12 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc13 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc14 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}
const acc15 = {
  n: 'F',
  d0: [200],
  d1: [new Date(2021, 5, 4)],
  en: 1245,
}

const accounts = [
  acc1,
  acc2,
  acc3,
  acc4,
  acc5,
  acc6,
  acc7,
  acc8,
  acc9,
  acc10,
  acc11,
  acc12,
  acc13,
  acc14,
  acc15,
]

let day = new Date('2024')
const overlay = document.createElement('div')
overlay.classList.add('overlay', 'loading')
overlay.innerHTML = `<svg class="icon icon--spinner light icon--48">
<use xlink:href="./assets/sprite.svg#icon-spinner"></use></svg>`
const dayTxt = document.createElement('p')
dayTxt.classList.add('day')
dayTxt.innerHTML = `${daysPassed(day)}`
body.prepend(dayTxt)
contentButtonClose.remove()

setInterval(() => {
  let dateNew = new Date()
  const dateFormat = new Intl.DateTimeFormat('it', optionClock).format(dateNew)
  date.innerHTML = dateFormat
}, 1000)

//
for (const [i, el] of accounts.entries()) {
  contentBoxFirst.innerHTML += `
  <div role="button" class="content__note content__note--${i}" data-ver="${i}">
  <p class="details details--name">${el.n}</p>
  <p class="details details--name">${el.en}</p>
  </div>`
}

//
contentBoxFirst.addEventListener('click', function (e) {
  e.preventDefault()
  const id = e.target.closest('.content__note')
  if (!id) return
  const selectedAcc = accounts[id.getAttribute('data-ver')]
  //
  contentBoxSecond.classList.add('active')
  contentBoxSecond.prepend(overlay)
  contentButtonClose.classList.remove('d-none')
  contentEl.prepend(contentButtonClose)
  loading()
  //
  userName.innerHTML = `${selectedAcc.n}`
  userCode.innerHTML = `${selectedAcc.en}`

  document.querySelector('.content__body').innerHTML = ''
  for (const [i] of selectedAcc.d0.entries()) {
    document.querySelector('.content__body').innerHTML += `
    <div class="content__card">
      <p class="details" id="user--movement">${selectedAcc.d0[i]}</p>
      <p class="details" id="user--days-passed">${daysPassed(
        selectedAcc.d1[i]
      )} giorni fa.</p>
    </div>
    `
  }

  //
  document
    .querySelectorAll('.content__note')
    .forEach(e => e.classList.remove('active'))
  id.classList.add('active')
})

contentButtonClose.addEventListener('click', reset)

///
////
//////
function loading() {
  setTimeout(() => {
    overlay.remove()
  }, 500)
}

function reset() {
  contentButtonClose.remove()
  contentBoxSecond.classList.remove('active')
  document
    .querySelectorAll('.content__note')
    .forEach(e => e.classList.remove('active'))
}

function daysPassed(data) {
  return Math.round(Math.abs(data - new Date()) / (1000 * 60 * 60 * 24))
}
