import React, { Component, lazy, Suspense } from 'react';

import '../scss/components/container.scss';
import rainbowGenerator from '../helpers/rainbow';

const Card = lazy(() => import('./Card'));

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfColors: 2,
      cards: [
        `rgb(0, 76, 255), rgb(187, 0, 255)`,
        `rgb(224, 255, 0), rgb(255, 66, 0)`,
        `rgb(63, 0, 255), rgb(255, 77, 0)`,
        `rgb(0, 39, 255), rgb(0, 255, 193)`,
        `rgb(149, 255, 0), rgb(255, 95, 0)`,
        `rgb(203, 255, 0), rgb(204, 0, 255)`,
        `rgb(0, 132, 255), rgb(158, 255, 0)`,
        `rgb(255, 0, 153), rgb(195, 0, 255)`,
        `rgb(0, 239, 255), rgb(0, 255, 145)`,
        `rgb(0, 106, 255), rgb(0, 46, 255)`,
        `rgb(0, 169, 255), rgb(0, 255, 110)`,
        `rgb(127, 0, 255), rgb(255, 97, 0)`,
        `rgb(255, 75, 0), rgb(255, 96, 0)`,
        `rgb(0, 255, 209), rgb(12, 255, 0)`,
        `rgb(0, 70, 255), rgb(190, 0, 255)`,
        `rgb(131, 0, 255), rgb(0, 46, 255)`,
        `rgb(98, 255, 0), rgb(0, 145, 255)`,
        `rgb(159, 0, 255), rgb(255, 0, 210)`,
        `rgb(255, 209, 0), rgb(0, 221, 255)`,
        `rgb(0, 255, 40), rgb(255, 0, 76)`
      ]
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
      }
    }
  }

  renderCards = () => {
    const { cards } = this.state;
    const { generateGradients, gradiantDirection } = this.props;
    return cards.map(card => {
      return (
        <Suspense key={card} fallback={<div>loading</div>}>
          <Card gradiantDirection={gradiantDirection} initialGradient={card} generateColors={this.generateColors} generateGradients={generateGradients}/>
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