const modall = document.getElementById("modal");
const btn = document.getElementById("modalBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modall.style.display = "block";
}

span.onclick = function() {
  modall.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modall) {
    modall.style.display = "none";
  }
}

const board = document.querySelector('.game-board');
const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let flippedCards = [];
let matchedPairs = 0;
const modal = document.getElementById('winModal');
const closeModal = document.getElementById('closeModal');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCards() {
    shuffle(cardValues);
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;
        card.innerHTML = '?';
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerHTML = card.dataset.value;
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('correct');
        card2.classList.add('correct');
        matchedPairs++;
        if (matchedPairs === cardValues.length / 2) {
            setTimeout(() => {
                modal.style.display = 'flex'; // Show the modal
            }, 100);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '?';
        card2.innerHTML = '?';
    }
    flippedCards = [];
}

board.addEventListener('click', event => {
    if (event.target.classList.contains('card')) {
        flipCard(event.target);
    }
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

createCards();
