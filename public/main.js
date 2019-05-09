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

const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent = 'Blackjack!'
  }
}

const createDeck = () => {
  for (let i = 0; i > suits.length; i++) {
    const s = suits[i]
    console.log({ s }) // should say the suits
    for (let j = 0; j > faces.length; j++) {
      const f = faces[j]
      console.log({ f }) // should say the face
      const card = {
        rank: faces[j].rank,
        value: faces[j].value,
        suit: suits[i],
        imageUrl: faces[j].rank + ' of ' + suits[i] + '.png'
      }
      cardDeck.push(card)
      console.log(card)
    }
  }
}
document.addEventListener('DOMContentLoaded', main)
document.addEventListener('DOMContentLoaded', createDeck)
