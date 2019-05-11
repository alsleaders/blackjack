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

const dealTwoCards = () => {
  for (let i = 0; i < 2; i++) {
    // const firstCard = cardDeck[0]
    // console.log({ firstCard })
    const takenCard = cardDeck.pop()
    console.log(cardDeck)
    playerDeck.push(takenCard)
    let thisIsYourCard =
      takenCard.rank +
      ' of ' +
      takenCard.suit +
      ' has a value of ' +
      takenCard.value
    const listItem = document.createElement('p')
    listItem.textContent = thisIsYourCard
    console.log(listItem)
    document.querySelector('.output').appendChild(listItem)
    console.log('This should have dealt the player this card ' + takenCard)
  }
}

const dealComputerTwoCards = () => {
  for (let i = 0; i < 2; i++) {
    const firstCard = cardDeck[0]
    console.log({ firstCard })
    const takeCard = cardDeck.pop()
    computerDeck.push(takeCard)
    // document.querySelector('.output').textContent =
    //   firstCard.rank +
    //   ' of ' +
    //   firstCard.suit +
    //   ' has a value of ' +
    //   firstCard.value
    console.log('this card ' + firstCard + ' was dealt to the computer')
  }
}
const main = () => {
  createDeck()
  shuffle()
  dealTwoCards()
  dealComputerTwoCards()
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent = 'Blackjack!'
  }
}
const hitCard = () => {
  const takenCard = cardDeck.pop()
  console.log(cardDeck)
  playerDeck.push(takenCard)
  let thisIsYourCard =
    takenCard.rank +
    ' of ' +
    takenCard.suit +
    ' has a value of ' +
    takenCard.value
  const listItem = document.createElement('p')
  listItem.textContent = thisIsYourCard
  console.log(listItem)
  document.querySelector('.hit-card').appendChild(listItem)
  console.log('Did the hit button work?')
}

const standCard = () => {
  let deckTotal = 0
  playerDeck.forEach(card => {
    console.log(card.value)
    deckTotal += card.value
  })
  console.log(deckTotal)
  document.querySelector('.total').textContent = deckTotal
  let computerTotal = 0
  computerDeck.forEach(card => {
    console.log(card.value)
    computerTotal += card.value
  })

  console.log(computerTotal)
  if (computerTotal < 17) {
    const firstCard = cardDeck[0]
    console.log({ firstCard })
    const takeCard = cardDeck.pop()
    computerDeck.push(takeCard)
  }
  if (deckTotal < 21 && deckTotal > computerTotal) {
    document.querySelector('.winner').textContent = 'You win!'
  } else if (deckTotal < 21 && computerTotal > 21) {
    document.querySelector('.winner').textContent = 'You win!'
  } else if ((deckTotal = 21 && computerTotal < 21)) {
    document.querySelector('.winner').textContent = 'You win!'
  } else if ((deckTotal = computerTotal && !(deckTotal = 21))) {
    document.querySelector('.winner').textContent = 'Push'
  } else {
    document.querySelector('.winner').textContent = 'The dealer wins!'
  }
}
// const playerTotal = sum
// how to we get value (.value)?  how do we use value?
// for (let i = 0; i < playerDeck.length; i++) {
//   let value = playerDeck.value
//   )
// sum player hand values
// compare sum to 21
//
document.addEventListener('DOMContentLoaded', main)
// document.addEventListener('DOMContentLoaded', createDeck)
// document.addEventListener('DOMContentLoaded', shuffle)
document.querySelector('.hit').addEventListener('click', hitCard)
document.querySelector('.stand').addEventListener('click', standCard)
// This code makes it so the display agrees with the first card in the players deck
// but it makes both dealt cards the same
// This code makes the cards in the players deck different
// but the first card doesn't match the display
