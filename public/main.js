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
    for (let j = 0; j < faces.length; j++) {
      const f = faces[j]
      const card = {
        rank: faces[j].rank,
        value: faces[j].value,
        suit: suits[i],
        imageUrl: faces[j].rank + ' of ' + suits[i] + '.png'
      }
      cardDeck.push(card)
    }
  }
  console.log('All cards pushed to deck')
}
const shuffle = () => {
  for (let i = cardDeck.length - 1; i > 0; i--) {
    const randomLocation = Math.floor(Math.random() * (i + 1))
    let lastCard = cardDeck[i]
    cardDeck[i] = cardDeck[randomLocation]
    cardDeck[randomLocation] = lastCard
  }
  console.log('All cards shuffled')
}

const dealTwoCards = () => {
  for (let i = 0; i < 2; i++) {
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
    document.querySelector('.output').appendChild(listItem)
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
  // document.querySelector('.hit-card').remove()
  // document.querySelector('.output').textContent = ''
  createDeck()
  shuffle()
  dealTwoCards()
  dealComputerTwoCards()
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent = 'Blackjack!'
  }
}

const reset = () => {
  document.querySelector('.output').textContent = ''
  const removeElement = () => {
    let element = document.getElementById('p')
    element.parentNode.removeChild('p')
  }
  createDeck()
  shuffle()
  dealTwoCards()
  dealComputerTwoCards()
  removeElement()
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
  let deckTotal = 0
  playerDeck.forEach(card => {
    console.log(card.value)
    deckTotal += card.value
  })
  if (deckTotal === 21) {
    document.querySelector('.winner').textContent = 'You got Blackjack!'
  }
  if (deckTotal > 21) {
    document.querySelector('.winner').textContent = 'You lost. The dealer wins!'
  }
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
    while (computerTotal < 17) {
      const firstCard = cardDeck[0]
      console.log({ firstCard })
      const takeCard = cardDeck.pop()
      computerDeck.push(takeCard)
      computerTotal += card.value
    }
    console.log(computerTotal + ' is the computers total')
  })

  // make this a while loop

  if (deckTotal < 21 && deckTotal > computerTotal) {
    console.log('like if you had 20 but the computer had 18')
    document.querySelector('.winner').textContent = 'You win!'
  } else if (deckTotal < 21 && computerTotal > 21) {
    console.log('this is if the computer busts')
    document.querySelector('.winner').textContent = 'You win!'
  } else if (deckTotal === 21 && computerTotal < 21) {
    console.log('You got blackjack')
    document.querySelector('.winner').textContent = 'You win!'
  } else if ((deckTotal = computerTotal && !(deckTotal = 21))) {
    console.log('this is a push')
    document.querySelector('.winner').textContent = 'Push'
  } else {
    document.querySelector('.winner').textContent = 'You lost. The dealer wins!'
  }
}

document.addEventListener('DOMContentLoaded', main)
document.addEventListener('DOMContentLoaded', shuffle)
document.querySelector('.hit').addEventListener('click', hitCard)
document.querySelector('.stand').addEventListener('click', standCard)
document.querySelector('.reset').addEventListener('click', reset)
