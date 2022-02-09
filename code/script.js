// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const findOutButton = document.getElementById('filter') // ???
const playAgainButton = document.getElementById('playAgain')
// for counterQuestions
let counterQuestionsDisplay = document.getElementById('counterQuestionsDisplay')
let counterRoundsDisplay = document.getElementById('counterRoundsDisplay')


// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Doris',
    img: 'images/doris.jpg',
    fur: ['grey', 'beige'],
    skin: 'white',
    claws: 'without',
    special: ['stripes', 'bicoloured']
  },
  {
    name: 'Simba',
    img: 'images/simba.jpg',
    fur: ['beige', 'brown'],
    skin: 'pink',
    claws: 'without',
    special: ['spots', 'bicoloured']
  },
  {
    name: 'Luna',
    img: 'images/luna.jpg',
    fur: 'beige',
    skin: 'pink',
    claws: 'without',
    special: ['fuzzy']
  },
  {
    name: 'Sigge',
    img: 'images/sigge.jpg',
    fur: ['white', 'blue'],
    skin: 'brown',
    claws: 'with',
    special: ['fuzzy', 'bicoloured']
  },
  {
    name: 'Elsa',
    img: 'images/elsa.jpg',
    fur: ['yellow', 'brown'],
    skin: 'brown',
    claws: 'with',
    special: ['spots', 'bicoloured']
  },
  {
    name: 'Bosse',
    img: 'images/bosse.jpg',
    fur: ['brown', 'orange'],
    skin: 'white',
    claws: 'without',
    special: ['stripes']
  },
  {
    name: 'Zelda',
    img: 'images/zelda.jpg',
    fur: ['orange'],
    skin: 'brown',
    claws: 'without',
    special: []
  },
  {
    name: 'Morris',
    img: 'images/morris.jpg',
    fur: ['beige', 'white'],
    skin: 'brown',
    claws: 'without',
    special: ['bicoloured', 'fuzzy']
  },
  {
    name: 'Selma',
    img: 'images/selma.jpg',
    fur: ['orange', 'brown'],
    skin: 'pink',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Sixten',
    img: 'images/sixten.jpg',
    fur: ['black', 'white'],
    skin: 'white',
    claws: 'without',
    special: ['bicoloured']
  },
  {
    name: 'Sally',
    img: 'images/sally.jpg',
    fur: ['yellow', 'beige'],
    skin: 'brown',
    claws: 'without',
    special: ['stripes', 'bicoloured']
  },
  {
    name: 'Findus',
    img: 'images/findus.jpg',
    fur: ['beige', 'white'],
    skin: 'pink',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Smulan',
    img: 'images/smulan.jpg',
    fur: ['black', 'grey'],
    skin: 'pink',
    claws: 'without',
    special: ['bicoloured']
  },
  {
    name: 'Harry',
    img: 'images/harry.jpg',
    fur: ['white', 'brown', 'orange', 'beige'],
    skin: 'brown',
    claws: 'without',
    special: ['multicoloured']
  },
  {
    name: 'Maja',
    img: 'images/maja.jpg',
    fur: ['brown', 'beige'],
    skin: 'pink',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Nisse',
    img: 'images/nisse.jpg',
    fur: ['black'],
    skin: 'grey',
    claws: 'without',
    special: []
  },
  {
    name: 'Nala',
    img: 'images/nala.jpg',
    fur: ['orange', 'white'],
    skin: 'beige',
    claws: 'with',
    special: ['fuzzy']
  },
  {
    name: 'Frasse',
    img: 'images/frasse.jpg',
    fur: ['blue'],
    skin: 'pink',
    claws: 'with',
    special: ['fuzzy']
  },
  {
    name: 'Siri',
    img: 'images/siri.jpg',
    fur: ['black', 'grey'],
    skin: 'black',
    claws: 'with',
    special: ['bicoloured']
  },
  {
    name: 'Sune',
    img: 'images/sune.jpg',
    fur: ['orange', 'brown'],
    skin: 'black',
    claws: 'with',
    special: ['spots', 'bicoloured']
  },
  {
    name: 'Iris',
    img: 'images/iris.jpg',
    fur: ['orange'],
    skin: 'orange',
    claws: 'without',
    special: ['stripes']
  },
  {
    name: 'Leo',
    img: 'images/leo.jpg',
    fur: ['grey'],
    skin: 'pink',
    claws: 'without',
    special: []
  },
  {
    name: 'Mollie',
    img: 'images/mollie.jpg',
    fur: ['brown'],
    skin: 'beige',
    claws: 'with',
    special: []
  },
  {
    name: 'Tusse',
    img: 'images/tusse.jpg',
    fur: ['orange'],
    skin: 'brown',
    claws: 'with',
    special: ['hairy']
  },
]

// Global variables
let secret
let currentQuestion
let charactersInPlay
// for counterQuestions
let countQuestions = 0
let countRounds = -1

// for auto close alert
let timerInterval

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  CHARACTERS.forEach((cat) => {
    if (charactersInPlay.includes(cat)) {
      board.innerHTML += `
      <div class="card">
        <p>${cat.name}</p>
        <img class="characters" src=${cat.img} alt=${cat.name}>
        <div class="guess">
          <span>Guess on ${cat.name}?</span>
          <button class="filled-button small" onclick="guess('${cat.name}')">Guess</button>
        </div>
      </div>
    `
    } else {
      board.innerHTML += `
      <div class="card">
        <img class="characters" src="./assets/cat-logo-large.svg" alt="not this cat">
      </div>
    `
    }
  })
}


// const sweetAlert = (newTitle) => {
//   Swal.fire({
//     title: newTitle,
//     color: '#356879',
//     confirmButtonColor: "#356879",
//     showClass: {
//       popup: 'animate__animated animate__fadeInDown'
//     },
//     hideClass: {
//       popup: 'animate__animated animate__fadeOutUp'
//     }
//   })
// }



const sweetAlert = (newTitle, newHTML) => {
  Swal.fire({
    title: newTitle,
    color: '#356879',
    html: newHTML,
    timer: 5000,
    timerProgressBar: true,
    confirmButtonColor: '#356879',
    // didOpen: () => {
    //   Swal.hideLoading()
    //   const b = Swal.getHtmlContainer().querySelector('b')
    //   timerInterval = setInterval(() => {
    //     b.textContent = Swal.getTimerLeft()
    //   }, 100)
    // },
    willClose: () => {
      clearInterval(timerInterval)
    }
  // }).then((result) => {
  //   if (result.dismiss === Swal.DismissReason.timer) {
  //     console.log('I was closed by the timer')
  //   }
  })
}




// annoying sound, it needs to be changed
// const badGuess = () => new Audio('./assets/cat-hissing.wav').play()

// Randomly select a cat from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
  console.log(secret)
}

// This function to start (and restart) the game
const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS
  // What else should happen when we start the game?
  generateBoard()
  setSecret()
  counterQuestionsDisplay.innerText = countQuestions
  countRounds++
  counterRoundsDisplay.innerText = countRounds
}

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label

  // This variable stores what option group (category) the question belongs to.
  // We also need a variable that stores the actual value of the question we've selected.
  // const value =
  const value = questions.value
  console.log('The selected category is', category, 'with this value:', value)


  currentQuestion = {
    category: category,
    value: value // ???
  }
}

// This function should be invoked when you click on 'Find Out' button.
const checkQuestion = () => {
  const { category, value } = currentQuestion
  // for counterQuestions
  countQuestions++
  counterQuestionsDisplay.innerText = countQuestions

  // Compare the currentQuestion details with the secret cat details in a different manner based on category (skin/claws or fur/special).
  // See if we should keep or remove people based on that
  // Then invoke filterCharacters
  if (category === 'skin' || category === 'claws') {
    // juste 'égal' ou non
    if (value === secret.skin || value === secret.claws) {
      filterCharacters(true)
      console.log('skin/claws is right')
    } else {
      filterCharacters(false)
      console.log('skin/claws is wrong')
    }

  } else if (category === 'fur' || category === 'special') {
    // peut avoir plusieurs accessoires/autres en même temps (donc 'contient', pas 'égal à')
    if (secret.fur.includes(value) || secret.special.includes(value)) {
      filterCharacters(true)
      console.log('fur/special is right')
    } else {
      filterCharacters(false)
      console.log('fur/special is wrong')
    }
  }
}

// It'll filter the characters array and redraw the game board.
const filterCharacters = (keep) => {
  const { category, value } = currentQuestion
  // Show the correct alert message for different categories
  if (category === 'fur') {
    if (keep) {
      sweetAlert(`Yes, the secret cat has a ${value} fur!`, `All cats without ${value} fur are now hidden.`)

    } else {
      sweetAlert(`No, the secret cat doesn't have a ${value} fur!`, `All cats with ${value} fur are now hidden.`)
      // badGuess()
    }
  } else if (category === 'special') {
    if (keep) {
      sweetAlert(`Yes, the secret cat has a special feature: ${value}!`, `All cats without the feature "${value}" are now hidden.`)
    } else {
      sweetAlert(`No, the secret cat doesn't have the special feature: ${value}!`, `All cats with the feature "${value}" are now hidden.`)
      // badGuess()
    }
  } else if (category === 'skin') {
    if (keep) {
      sweetAlert(`Yes, the secret cat has a ${value} skin!`, `All cats without ${value} skin are now hidden.`)
    } else {
      sweetAlert(`No, the secret cat doesn't have a ${value} skin!`, `All cats with ${value} skin are now hidden.`)
      // badGuess()
    }
  } else if (category === 'claws') {
    if (keep) {
      sweetAlert(`Yes, the secret cat is ${value} claws!`, `All cats that aren't ${value} claws are now hidden.`)
    } else {
      sweetAlert(`No, the secret cat isn't ${value} claws!`, `All cats ${value} claws are now hidden.`)
      // badGuess()
    }
  }

  // Determine what is the category
  // filter by category to keep or remove based on the keep variable.
  if (category === 'skin' || category === 'claws') {
    if (value === secret.skin || value === secret.claws) {
      charactersInPlay = charactersInPlay.filter((cat) => cat[category] === value)
    } else {
      charactersInPlay = charactersInPlay.filter((cat) => cat[category] !== value)
    }
  } else if (category === 'fur' || category === 'special') {
    if (secret.fur.includes(value) || secret.special.includes(value)) {
      charactersInPlay = charactersInPlay.filter((cat) => cat[category].includes(value))
    } else {
      charactersInPlay = charactersInPlay.filter((cat) => !cat[category].includes(value))
    }
  }
  // Invoke a function to redraw the board with the remaining people.
  generateBoard()
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (catToConfirm) => {
  // store the interaction from the player in a variable. // qu'est-ce que ca veut dire????
  // remember the confirm() ?
  //if (confirm(`Do you really want to make a guess on ${catToConfirm}?`) == true) {
  // If the player wants to guess, invoke the checkMyGuess function.
  //  checkMyGuess(catToConfirm) // à mettre dans le 'if confirm true' ou à la fin de la fonction?
  //} else { // utile ou non?
  //  false
  //}

  if (Swal.fire({
    title: `Do you really want to make a guess on ${catToConfirm}?`,
    text: 'It will end this round.',
    icon: 'warning',
    iconColor: '#356879',
    showCancelButton: true,
    confirmButtonColor: '#356879',
    cancelButtonColor: '#6B96A6',
    confirmButtonText: 'Confirm'
  }).then((result) => {
    if (result.isConfirmed) {
      checkMyGuess(catToConfirm)
    }
  }))


    console.log(secret.name)
  console.log(catToConfirm)

}

// If you confirm, this function is invoked
const checkMyGuess = (catToCheck) => {
  console.log(catToCheck)

  // 1. Check if the catToCheck is the same as the secret cat's name
  if (catToCheck === secret.name) {
    // 2. Set a Message to show in the win or lose section accordingly
    document.getElementById('winOrLoseText').innerText = `You won! As you guessed, ${catToCheck} was the secret cat!`
    // 3. Show the win or lose section
    document.getElementById('winOrLose').style.display = 'flex'
    // 4. Hide the game board
    board.style.display = 'none'
    // video not working well on iPhone, needs to be fixed, maybe the playsinline attribute
    document.getElementById('winReward').innerHTML = `
    <video src="./assets/cute-cat.mp4" type="video/mp4" autoplay muted loop playsinline>video</video>
    <audio src="./assets/cat-purring.wav" type="audio/wav" autoplay loop></audio>
    `
  } else {
    // 2. Set a Message to show in the win or lose section accordingly
    document.getElementById('winOrLoseText').innerText = `You lost! Unfortunately, ${catToCheck} wasn't the secret cat, it was ${secret.name}...`
    // 3. Show the win or lose section
    document.getElementById('winOrLose').style.display = 'flex'
    // 4. Hide the game board
    board.style.display = 'none'
  }
}

const playAgain = () => {
  start()
  document.getElementById('winOrLose').style.display = 'none'
  document.getElementById('winReward').innerHTML = ''
  board.style.display = 'flex'
  countQuestions = 0
  counterQuestionsDisplay.innerText = countQuestions
  counterRoundsDisplay.innerText = countRounds
  // je dois trouver comment faire reset pour la question aussi...
}

// Invokes the start function when website is loaded
start()


// CHARACTERS.forEach(({ name, skin, claws }) => {
//   console.log(name)
//   console.log(skin)
//   console.log(claws)
// })

// All the event listeners
restartButton.addEventListener('click', start)
questions.addEventListener('change', selectQuestion)
findOutButton.addEventListener('click', checkQuestion)
playAgainButton.addEventListener('click', playAgain)

window.addEventListener('load', () => {
  Swal.fire({
    imageUrl: './assets/cat-logo-small.svg',
    color: '#356879',
    title: "What's your name?",
    text: "Please type your name if you want to play.",
    input: 'text',
    confirmButtonColor: '#356879',
}).then((result) => {
    if (result.value) {
        console.log("Result: " + result.value);
    }
});
});