import React, { Component, lazy, Suspense } from 'react';

import '../scss/components/container.scss';

const Card = lazy(() => import('./Card'));

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //this should actually have an already hard coded group of linear gradients later on
      cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }
  }

  renderCards = () => {
    const { cards } = this.state;
    return cards.map(card => {
      return (
        <Suspense key={card} fallback={<div>loading</div>}>
          <Card />
        </Suspense>
      )
    })
  }

  render() {
    return (
      <div className='container'>
        {this.renderCards()}
      </div>
    )
  }
}

export default Container;