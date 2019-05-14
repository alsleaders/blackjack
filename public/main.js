const suits = ['hearts', 'diamonds', 'spades', 'clubs']
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
let deckTotal = 0
let computerTotal = 0

const createDeck = () => {
  cardDeck = []
  for (let i = 0; i < suits.length; i++) {
    const s = suits[i]
    for (let j = 0; j < faces.length; j++) {
      const f = faces[j]
      const card = {
        rank: faces[j].rank,
        value: faces[j].value,
        suit: suits[i],
        imageUrl: '/images/' + f.rank + '_' + 'of' + '_' + s + '.svg'
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
    const thisIsYourCard = document.createElement('img')
    thisIsYourCard.src =
      '/images/' + takenCard.rank + '_' + 'of' + '_' + takenCard.suit + '.svg'
    document.querySelector('.output').appendChild(thisIsYourCard)
  }
  let deckTotal = 0
  playerDeck.forEach(card => {
    console.log(card.value)
    deckTotal += card.value
  })
  if (deckTotal === 21) {
    document.querySelector('.winner').textContent = 'You got Blackjack!'
    document.querySelector('.hit').disabled = true
    document.querySelector('.stand').disabled = true
  }
  if (deckTotal > 21) {
    document.querySelector('.winner').textContent = 'You lost. The dealer wins!'
  }
}

const dealComputerTwoCards = () => {
  for (let i = 0; i < 2; i++) {
    const takeCard = cardDeck.pop()
    computerDeck.push(takeCard)
    console.log('this card ' + { takeCard } + ' was dealt to the computer')
  }
}

const disableButtons = status => {
  document.querySelector('.hit').disabled = status
  document.querySelector('.stand').disabled = status
}
const reset = () => {
  cardDeck = []
  playerDeck = []
  document.querySelector('.output').textContent = ''
  computerDeck = []
  document.querySelector('.computer-output').textContent = ''
  deckTotal = 0
  computerTotal = 0
  document.querySelector('.winner').textContent = ''
  disableButtons(false)
  main()
}

const hitCard = () => {
  const takenCard = cardDeck.pop()
  playerDeck.push(takenCard)

  const thisIsYourCard = document.createElement('img')
  thisIsYourCard.src = takenCard.imageUrl
  // '/images/' + takenCard.rank + '_' + 'of' + '_' + takenCard.suit + '.svg'
  document.querySelector('.output').appendChild(thisIsYourCard)
  let expandingList = document.createElement('img', { is: 'expanding-list' })

  expandingList.textContent = thisIsYourCard
  document.querySelector('.hit-card').appendChild(expandingList)
  console.log('Did the hit button work?')
  let deckTotal = 0
  playerDeck.forEach(card => {
    console.log(card.value)
    deckTotal += card.value
  })
  if (deckTotal === 21) {
    document.querySelector('.winner').textContent =
      'You win! You got Blackjack!'
    disableButtons(true)
    displayComputerHand()
  }
  if (deckTotal > 21) {
    document.querySelector('.winner').textContent =
      'You busted. The dealer wins!'
    disableButtons(true)
    displayComputerHand()
  }
}

const standCard = () => {
  disableButtons(true)

  // adds the players cards up
  playerDeck.forEach(card => {
    console.log(card.value)
    deckTotal += card.value
  })
  console.log(deckTotal)
  // document.querySelector('.total').textContent = deckTotal // perfect this far in this function

  // adds the computers cards up
  computerDeck.forEach(card => {
    computerTotal += card.value
  })
  // while loop for computer hitting
  while (computerTotal < 17) {
    const takeCard = cardDeck.pop()
    computerDeck.push(takeCard)
    computerTotal += takeCard.value
    console.log(computerTotal + ' is the computers total')
  }
}

const displayComputerFirstCard = () => {
  const displayComputersCard = document.createElement('img')
  let expandingList = document.createElement('img', { is: 'expanding-list' })
  displayComputersCard.src = computerDeck[0].imageUrl
  document.querySelector('.computer-output').appendChild(displayComputersCard)
  expandingList.textContent = displayComputersCard
  document.querySelector('.computer-output').appendChild(expandingList)
}
document.querySelector('.computer-card-text').textContent =
  "These are the dealer's cards"

const displayComputerHand = () => {
  const displayComputersCard = document.createElement('img')
  let expandingList = document.createElement('img', { is: 'expanding-list' })
  document.querySelector('.computer-output').appendChild(displayComputersCard)
  expandingList.textContent = displayComputersCard
  document.querySelector('.computer-output').appendChild(expandingList)
  for (let i = 1; i < computerDeck.length; i++) {
    const displayComputersCard = document.createElement('img')
    let expandingList = document.createElement('img', { is: 'expanding-list' })
    displayComputersCard.src = computerDeck[i].imageUrl
    document.querySelector('.computer-output').appendChild(displayComputersCard)
    expandingList.textContent = displayComputersCard
    document.querySelector('.computer-output').appendChild(expandingList)
  }
}

const determineTheWinner = () => {
  document.querySelector('.winner').textContent = 'This is your result'
  if (deckTotal < 21 && deckTotal > computerTotal) {
    document.querySelector('.winner').textContent = 'You win!'
  } else if (deckTotal < 21 && computerTotal > 21) {
    document.querySelector('.winner').textContent =
      'The dealer busted. You win!'
  } else if (deckTotal === 21 && computerTotal < 21) {
    document.querySelector('.winner').textContent = 'You win! You got blackjack'
  } else if (deckTotal === computerTotal && deckTotal < 21) {
    document.querySelector('.winner').textContent = 'Push'
  } else {
    document.querySelector('.winner').textContent = 'You lost. The dealer wins!'
  }
}

const main = () => {
  createDeck()
  shuffle()
  dealTwoCards()
  dealComputerTwoCards()
  displayComputerFirstCard()
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent = 'Blackjack!'
  }
}
document.addEventListener('DOMContentLoaded', main)
document.addEventListener('DOMContentLoaded', shuffle)
document.querySelector('.hit').addEventListener('click', hitCard)
document.querySelector('.stand').addEventListener('click', standCard)
document.querySelector('.reset').addEventListener('click', reset)
document.querySelector('.stand').addEventListener('click', displayComputerHand)
document.querySelector('.stand').addEventListener('click', determineTheWinner)
