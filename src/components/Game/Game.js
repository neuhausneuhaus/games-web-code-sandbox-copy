import React from 'react'

import Timer from '../Timer/Timer'
import Board from '../Board/Board'
import styles from './Game.scss'

const Game = () => (
  <div>
    <h1 className={styles.header}>NYT Games Code Test</h1>
    <Timer />
    <Board />
  </div>
)

export default Game
