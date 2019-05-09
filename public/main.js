const suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs']
const faces = [
  { rank: 'Ace', value: 11 },
  { rank: '2', value: 2 },
  { rank: '3', value: 3 },
  { rank: '4', value: 4 },
  { rank: '5', value: 5 },
  { rank: '6', value: 6 },
  { rank: '7', value: 7 },
  { rank: '8', value: 8 },
  { rank: '9', value: 9 },
  { rank: '10', value: 10 },
  { rank: 'Jack', value: 10 },
  { rank: 'Queen', value: 10 },
  { rank: 'King', value: 10 }
]

let cardDeck = []
let playerDeck = []
let computerDeck = []

const createDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    const s = suits[i]
    console.log({ s }) // should say the suits
    for (let j = 0; j < faces.length; j++) {
      const f = faces[j]
      console.log({ f }) // should say the face
      const card = {
        rank: faces[j].rank,
        value: faces[j].value,
        suit: suits[i],
        imageUrl: faces[j].rank + ' of ' + suits[i] + '.png'
      }
      cardDeck.push(card)
      console.log({ card })
    }
  }
  console.log('All cards pushed to deck')
}
const shuffle = () => {
  // shownDeck = []
  for (let i = cardDeck.length - 1; i > 0; i--) {
    // select a random card we have not hit yet
    const randomLocation = Math.floor(Math.random() * (i + 1))
    // swap the current card with the random card
    let lastCard = cardDeck[i] // define variables for shuffle
    cardDeck[i] = cardDeck[randomLocation]
    cardDeck[randomLocation] = lastCard
    console.log(lastCard)
  }
  console.log('All cards shuffled')
}

const dealCard = () => {
  const firstCard = cardDeck[0]
  console.log(firstCard)
  const takeCard = cardDeck.pop()
  playerDeck.push(takeCard)
  document.querySelector('.output').textContent =
    firstCard.rank +
    ' of ' +
    firstCard.suit +
    ' has a value of ' +
    firstCard.value
  console.log('does this do anything?' + { firstCard })
}

const dealComputer = () => {
  const firstCard = cardDeck[0]
  console.log(firstCard)
  const takeCard = cardDeck.pop()
  computerDeck.push(takeCard)
  document.querySelector('.output').textContent =
    firstCard.rank +
    ' of ' +
    firstCard.suit +
    ' has a value of ' +
    firstCard.value
  console.log('this card ' + { firstCard } + ' was dealt to the computer')
}
const main = () => {
  createDeck()
  shuffle()
  dealCard()
  dealCard()
  dealComputer()
  dealComputer()
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent = 'Blackjack!'
  }
}

document.addEventListener('DOMContentLoaded', main)
// document.addEventListener('DOMContentLoaded', createDeck)
// document.addEventListener('DOMContentLoaded', shuffle)
document.querySelector('.hit').addEventListener('click', dealCard)
