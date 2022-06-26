import React from 'react'
import './Board.css'
import Sound from './Sound/Sound'

const board = () => {
  // Max 18 sounds

  
  return (
    <div className="board__container">
        <div className="board__header">
            <h3>Soundboard</h3>
        </div>
        <div className="board__items">
           <Sound />
        </div>
    </div>
  )
}

export default board