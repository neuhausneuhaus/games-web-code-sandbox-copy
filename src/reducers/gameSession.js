import { FLIP_UP_CARD, CHECK_MATCHED_PAIR, markPairAsMatched, 
         MARK_PAIR_AS_MATCHED, flipDownPair, FLIP_DOWN_PAIR, INIT_GAME, 
         checkMatchedPair, flipUpCard } from "../actions";


var startingCards = {
  "levels": [
    {
      "cards": [ "✈", "♘", "✈", "♫", "♫", "☆", "♘", "☆" ],
      "difficulty": "easy"
    },
    {
      "cards": [ "❄", "⍨", "♘", "✈", "☯", "♠", "☆", "❄", "♫", "♫", "☯", "☆", "✈", "⍨", "♠", "♘" ],
      "difficulty": "hard"
    }
  ]
}

var difficultySelected = "easy";

var numberOfCards = difficultySelected=="easy" ? 8 : 16;


// TODO: Fetch from https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json instead of hardcoding!


// const initialTurnState = {
const initialGameState = {
  selectionsInTurn : 0,
  firstSelection : undefined,
  secondSelection : undefined,
  thirdSelection : undefined,
  turnsTaken : 0,
  matchesMade : 0,
  gameCompleted: false,
  cards: generateNewCards()
};

// Returns object 
function gameSession(gameState = initialGameState, action){
  switch (action.type) {
    case INIT_GAME:
      return Object.assign({}, initialGameState, { cards: initialGameState.cards } );
    
    case CHECK_MATCHED_PAIR:
      if (state.selectionsInTurn === 2 && cardsHaveIdenticalIcons(state.firstSelection, state.secondSelection, state.cards)) {
        // PAIR MATCHED
        let matchesMade = state.matchesMade + 1;
        let gameCompleted = false;
        if (matchesMade >= numberOfCards/2) {
          gameCompleted = true;
        }
        return Object.assign({}, state, { 
          matchesMade: matchesMade,
          turnsTaken: state.turnsTaken + 1,
          selectionsInTurn: 0,
          gameCompleted: gameCompleted, 
          cards: memoryCards(state.cards, markPairAsMatched(state.firstSelection, state.secondSelection)) } );      
      } else if (state.selectionsInTurn === 2) {
        // PAIR DID NOT MATCH
        return Object.assign({}, state, { 
          selectionsInTurn: 0,
          turnsTaken: state.turnsTaken + 1, 
          cards: memoryCards(state.cards, flipDownPair(state.firstSelection, state.secondSelection)) } );              
      }
      return state;
    
    case FLIP_UP_CARD:
      if (state.selectionsInTurn === 2)
      {
        // Two cards are already flipped
        // Check for match and trigger a new flip
        let s = memoryGame(state, checkMatchedPair());
        return memoryGame(s, flipUpCard(action.id));
      }

      let card = getCard(action.id, state.cards);
      if (card.flippedUp || card.matched) {        
        return state;
      }

      let firstSelection = state.firstSelection;
      let secondSelection = state.secondSelection;
      if (state.selectionsInTurn === 0) {
        firstSelection = action.id;
      } else {
        secondSelection = action.id;
      }
      let numClicks = state.selectionsInTurn + 1;

      return Object.assign({}, state, { 
        firstSelection: firstSelection, 
        secondSelection: secondSelection, 
        selectionsInTurn : numClicks,
        cards: memoryCards(state.cards, action) } );    
    
    // case SHUFFLE_CARDS:
    //   return Object.assign({}, state, { cards: memoryCards(state.cards, action) } );
    
    default:
      return state;
  }
}



/*TODO: Move these functions to appropriate home*/

function generateNewCards() {
  // TODO: create difficulty state toggle
  var cardIcons = startingCards.levels.find(obj => {
    return obj.difficulty === "easy"
  }).cards;

  var randomizedIcons = cardIcons.sort(function(a, b){return 0.5 - Math.random()});

  var cardArray = [];
  for (var i = 0; i < randomizedIcons.length; i++) {

    var card = {
      id: i,
      icon: randomizedIcons[i],
      revealed: false,
      matched: false
    };
    cardArray.push(card);
  }
  return cardArray;
};


function getCard(id, cards) {
  for(let i=0; i < numberOfCards; i++) {
    if (cards[i].id === id) {
      return cards[i];
    }
  };
}

function cardsHaveIdenticalIcons(id1, id2, cards) {
  if (getCard(id1, cards).icon === getCard(id2, cards).icon) {
    return true;
  } else {
    return false;
  }
}


export default gameSession;