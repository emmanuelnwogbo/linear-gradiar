import React, { Component } from 'react';

import '../scss/components/card.scss'

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradient: null
    }
  }

  render() {
    return (
      <div className='card'>
        <div className="card--btn">copy</div>
      </div>
    )
  }
}

export default Card;