import React from 'react'

class Card extends React.Component {
  // TODO: Rewrite for flavour once working
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.matched && !this.props.flippedUp) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    var cardClass  = 'card'
    if (this.props.flippedUp) {
      cardClass = cardClass + ' flipped'
    }
    if (this.props.matched) {
      cardClass = cardClass + ' matched'
    }
    var showIcon = this.props.flippedUp || this.props.matched;
    var cardIcon = showIcon ? this.props.cardIcon : "Card";
    return (
      <div onClick={this.onClick} className={cardClass} >
        {cardIcon}
      </div>
    );
  }
}


// import PropTypes from 'prop-types'

// Card.PropTypes = {
//     onClick: PropTypes.func.isRequired,
//     flipped: PropTypes.bool.isRequired,
//     resolved: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
// }

export default Card
