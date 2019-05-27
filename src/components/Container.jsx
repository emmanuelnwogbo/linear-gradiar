import React, { Component, lazy, Suspense } from 'react';

import '../scss/components/container.scss';
import rainbowGenerator from '../helpers/rainbow';

const Card = lazy(() => import('./Card'));

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //this should actually have an already hard coded group of linear gradients later on
      direction: `to bottom right`,
      degree: `10deg`,
      numberOfColors: 2,
      cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }
  }

  generateColors = (colors, gradient) => {
    const { numberOfColors } = this.state;
    const colorArr = [];
    let tracker = 0;
    while (tracker < numberOfColors) {
      tracker+=1;
      colorArr.push(
        `${rainbowGenerator(
          Math.round(Math.random() * 100), 
          Math.round(Math.random() * 80)
        )}`
      )
    }

    if (tracker === numberOfColors) {
      return {
        colors: colorArr,
        //gradient: `linear-gradient(to bottom right, ${prevState.colors[0]}, ${prevState.colors[1]})`
      }
    }
  }

  renderCards = () => {
    const { cards } = this.state;
    const { generateGradients } = this.props;
    return cards.map(card => {
      return (
        <Suspense key={card} fallback={<div>loading</div>}>
          <Card generateColors={this.generateColors} generateGradients={generateGradients}/>
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