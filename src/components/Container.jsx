import React, { Component, lazy, Suspense } from 'react';

import '../scss/components/container.scss';
import rainbowGenerator from '../helpers/rainbow';

const Card = lazy(() => import('./Card'));

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfColors: 2,
      cards: null,

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
    const { generateGradients, gradiantDirection, gradientsOpacityOne, gradientsOpacityTwo } = this.props;
    if (cards !== null) {
      return cards.map(card => {
        return (
          <Suspense key={card} fallback={<div>loading</div>}>
            <Card 
            initialRender={this.props.initialRender} 
            gradiantDirection={gradiantDirection} 
            initialGradient={card} 
            generateColors={this.generateColors} 
            generateGradients={generateGradients}
            gradientsOpacityOne={gradientsOpacityOne}
            gradientsOpacityTwo={gradientsOpacityTwo}/>
          </Suspense>
        )
      })
    }
    return <div></div>
  }

  componentWillMount() {
    //const { gradientsOpacityOne, gradientsOpacityTwo } = this.props;
    this.setState(({ cards: [
      [0, 76, 255, 187, 0, 255],
      [224, 255, 0, 255, 66, 0],
      [63, 0, 255, 255, 77, 0],
      [0, 39, 255, 0, 255, 193],
      [149, 255, 0, 255, 95, 0],
      [203, 255, 0, 204, 0, 255],
      [0, 132, 255, 158, 255, 0],
      [255, 0, 153, 195, 0, 255],
      [0, 239, 255, 0, 255, 145],
      [0, 106, 255, 0, 46, 255],
      [0, 169, 255, 0, 255, 110],
      [127, 0, 255, 255, 97, 0],
      [255, 75, 0, 255, 96, 0],
      [0, 255, 209, 12, 255, 0],
      [0, 70, 255, 190, 0, 255],
      [131, 0, 255, 0, 46, 255],
      [98, 255, 0, 0, 145, 255],
      [159, 0, 255, 255, 0, 210],
      [255, 209, 0, 0, 221, 255],
      [0, 255, 40, 255, 0, 76]
    ]}), () => {
      console.log(this.state)
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