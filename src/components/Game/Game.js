// import React from 'react'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Timer from '../Timer/Timer'
import Board from '../Board/Board'
import Card from '../Card/Card'
import { flipUpCard, checkMatchedPair, initGame } from '../../actions';

// import styles from './Game.scss'
import './Game.scss'

// const Game = () => (
//   <div>
//     <h1 className={styles.header}>NYT Games Code Test</h1>
//     <Timer />
//     <Board />
//   </div>
// )




class Game extends Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    // TODO: Fix this!!!
    setInterval(this.props.onCheckForMatchedPair,5000);
  }

  getCards() {
    var onClick = this.props.onCardClicked;
    //TODO b4 commit: change loop type
    var cards = this.props.cards;
    var cardObjs = [];
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var cardObj = <Card key={c.id}
                          id={c.id}
                          icon={c.icon}
                          flippedUp = {c.flippedUp}
                          matched = {c.matched} 
                          onClick={onClick}/>
      cardObjs.push(cardObj);
    };
    return cardObjs;
  }
  statusArea() {
    var genStatus = this.props.gameCompleted ?
      "YOU DID IT!" :
      this.props.matchesMade + "Pairs Found";
    var restartBtnText = this.props.gameCompleted ?
      "Play Again?" :
      "Restart"
    return (
      <div className='game-status'>
        <div className='game-status_gen'>{genStatus}</div>
        <div className='game-status_turns'>{this.props.turnsTaken + " turns taken"}</div>
        <div className='game-status_restart-btn'>{restartBtnText}</div>
      </div>
    );
  }
  render() {
    var cards = this.getCards();

    return (
      <div>
        {this.statusArea()}
        <div className='game-board'>
          {cards}
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({state}) => ({
  cards: state.cards,
  turnsTaken: state.turnsTaken,
  gameCompleted: state.gameCompleted,
  matchesMade: state.matchesMade
})

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClicked: id => {
      dispatch(flipUpCard(id));
    },
    onCheckForMatchedPair: () => {
      dispatch(checkMatchedPair());
    },
    onPlayAgain: () => {
      dispatch(initGame());
    }
  };
};

const GameView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameView;


// export default Game
