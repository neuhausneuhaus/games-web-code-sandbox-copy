import React from 'react'
import PropTypes from 'prop-types'


const Card = ({ onClick, flipped, resolved, text }) => (
    <li
        onClick= {onClick}
        style= {{
            fontWeight: flipped ? 'bold' : '100',
            textDecoration: resolved ? 'line-through' : 'none' 
        }}
    >
        {text}
    </li>
)

Card.PropTypes = {
    onClick: PropTypes.func.isRequired,
    flipped: PropTypes.bool.isRequired,
    resolved: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Card
