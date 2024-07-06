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
let dateNew = new Date('2024')
const overlay = document.createElement('div')
overlay.classList.add('overlay', 'loading')
overlay.innerHTML = `<svg class="icon icon--spinner light icon--48">
<use xlink:href="./assets/sprite.svg#icon-spinner"></use></svg>`
const dayTxt = document.createElement('p')
dayTxt.classList.add('day')
dayTxt.innerHTML = `${daysPassed(dateNew)}`
body.prepend(dayTxt)
contentButtonClose.remove()

const optionAll = {
  day: 'numeric',
  month: 'numeric',
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

setInterval(() => {
  dateNew = new Date()
  const dateFormat = new Intl.DateTimeFormat('it', optionClock).format(dateNew)
  date.innerHTML = dateFormat
}, 1000)

const person1 = {
  nick: 'J',
  debit: [200, 150],
  date: [new Date(2024, 5, 4), new Date('2020')],
  code: 1101,
}

const person2 = {
  nick: 'P',

  debit: [700, 12250, 200],
  date: [new Date(2024, 5, 4), new Date(2024, 3, 4), new Date('2024')],
  code: 2262,
}
const person3 = {
  nick: 'P',

  debit: [700, 12250, 200],
  date: [...person2.date],
  code: 1445,
}
const person4 = {
  nick: 'E',

  debit: [200, 150],
  date: [...person1.date],
  code: 9245,
}
const person5 = {
  nick: 'O',

  debit: [200, 150, 700, 1450, 100, 53],
  date: [...person1.date],
  code: 7284,
}
const person6 = {
  nick: 'F',

  debit: [200],
  date: [new Date(2021, 5, 4)],
  code: 1245,
}

const accounts = [person1, person2, person3, person4, person5, person6]
for (const [i, el] of accounts.entries()) {
  contentBoxFirst.innerHTML += `
  <div role="button" class="content__note content__note--${i}" data-ver="${i}">
  <p class="details details--name">${el.nick}</p>
  <p class="details details--name">${el.code}</p>
  </div>`
}

let casualSiz = [500, 800, 900, 1050, 500]
contentBoxFirst.addEventListener('click', function (e) {
  let num = Math.trunc(Math.random() * casualSiz.length)
  const id = e.target.closest('.content__note')
  if (!id) return
  const selectedAcc = accounts[id.getAttribute('data-ver')]

  //
  contentBoxSecond.classList.add('active')
  contentBoxSecond.prepend(overlay)
  setTimeout(() => {
    overlay.remove()
    contentButtonClose.classList.remove('d-none')
    contentEl.prepend(contentButtonClose)
  }, casualSiz[num])
  //
  userName.innerHTML = `${selectedAcc.nick}`
  userCode.innerHTML = `${selectedAcc.code}`

  document.querySelector('.content__body').innerHTML = ''
  for (const [i] of selectedAcc.debit.entries()) {
    document.querySelector('.content__body').innerHTML += `
    <div class="content__card">
      <p class="details" id="user--movement">${selectedAcc.debit[i]}</p>
      <p class="details" id="user--days-passed">${daysPassed(
        selectedAcc.date[i]
      )} giorni fa.</p>
    </div>
    `
  }

  //
  document
    .querySelectorAll('.content__note')
    .forEach(e => e.classList.remove('active'))
  id.classList.add('active')

  //
  // if (contentBoxSecond.classList.contains('active')) {
  //   contentEl.prepend(contentButtonClose)
  // }
})

contentButtonClose.addEventListener('click', reset)
////
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
