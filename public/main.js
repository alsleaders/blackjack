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
  for (let i = 0; i < suits.length; i++) {
    const s = suits[i]
    for (let j = 0; j < faces.length; j++) {
      const f = faces[j]
      const card = {
        rank: faces[j].rank,
        value: faces[j].value,
        suit: suits[i],
        imageUrl: `/images/${faces.rank}_of_${suits}.svg`
        // /images/faces[j].rank + '_of_' + suits[i] + '.svg'
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
// const createCardImage = () => {
//     const createCardFront = document.createElement('img')
//       createPlayerCard.src = '/images/' +
// }
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
    // let thisIsYourCard =
    //   takeCard.rank +
    //   ' of ' +
    //   takeCard.suit +
    //   ' has a value of ' +
    //   takeCard.value
    // const listItem = document.createElement('p')
    // listItem.textContent = thisIsYourCard
    // document.querySelector('.computer-output').appendChild(listItem)
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
  window.location.reload(true)
}

const hitCard = () => {
  const takenCard = cardDeck.pop()
  console.log(cardDeck)
  playerDeck.push(takenCard)

  const thisIsYourCard = document.createElement('img')
  thisIsYourCard.src =
    '/images/' + takenCard.rank + '_' + 'of' + '_' + takenCard.suit + '.svg'
  document.querySelector('.output').appendChild(thisIsYourCard)
  let expandingList = document.createElement('img', { is: 'expanding-list' })

  expandingList.textContent = thisIsYourCard
  // console.log(listItem)
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
    document.querySelector('.hit').disabled = true
    document.querySelector('.stand').disabled = true
  }
  if (deckTotal > 21) {
    document.querySelector('.winner').textContent =
      'You busted. The dealer wins!'
    document.querySelector('.hit').disabled = true
    document.querySelector('.stand').disabled = true
  }
}

const standCard = () => {
  document.querySelector('.hit').disabled = true
  document.querySelector('.stand').disabled = true

  // adds the players cards up
  playerDeck.forEach(card => {
    console.log(card.value)
    deckTotal += card.value
  })
  console.log(deckTotal)
  document.querySelector('.total').textContent = deckTotal // perfect this far in this function

  // adds the computers cards up
  computerDeck.forEach(card => {
    computerTotal += card.value
    console.log(computerTotal + ' is the computers total right now')
    // computerTotal += takeCard.value
  })
  // while loop for computer hitting
  while (computerTotal < 17) {
    const takeCard = cardDeck.pop()
    computerDeck.push(takeCard)
    computerTotal += takeCard.value
    console.log(computerTotal + ' is the computers total')
  }
  // shows the computers hand
  for (let i = 0; i < computerDeck.length; i++) {
    const thisIsTheComputersCard = document.createElement('img')
    thisIsTheComputersCard.src =
      '/images/' +
      computerDeck.rank +
      '_' +
      'of' +
      '_' +
      computerDeck.suit +
      '.svg'
    document
      .querySelector('.computer-output')
      .appendChild(thisIsTheComputersCard)

    // let thisIsYourCard =
    //   computerDeck[i].rank +
    //   ' of ' +
    //   computerDeck[i].suit +
    //   ' has a value of ' +
    //   computerDeck[i].value
    // const listItem = document.createElement('p')
    // listItem.textContent = thisIsYourCard
    // document.querySelector('.computer-output').appendChild(listItem)
  }
  document.querySelector('.computer-total').textContent = computerTotal

  if (deckTotal < 21 && deckTotal > computerTotal) {
    console.log('like if you had 20 but the computer had 18')
    document.querySelector('.winner').textContent = 'You win!'
  } else if (deckTotal < 21 && computerTotal > 21) {
    console.log('this is if the computer busts')
    document.querySelector('.winner').textContent =
      'The dealer busted. You win!'
  } else if (deckTotal === 21 && computerTotal < 21) {
    console.log('You got blackjack')
    document.querySelector('.winner').textContent = 'You win! You got blackjack'
  } else if (deckTotal === computerTotal && deckTotal < 21) {
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
