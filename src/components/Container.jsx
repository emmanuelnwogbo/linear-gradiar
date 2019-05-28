import React, { Component, lazy, Suspense } from 'react';

import '../scss/components/container.scss';
import rainbowGenerator from '../helpers/rainbow';

const Card = lazy(() => import('./Card'));

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfColors: 2,
      cards: null
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
    if (cards !== null) {
      return cards.map(card => {
        return (
          <Suspense key={card} fallback={<div>loading</div>}>
            <Card initialRender={this.props.initialRender} gradiantDirection={gradiantDirection} initialGradient={card} generateColors={this.generateColors} generateGradients={generateGradients}/>
          </Suspense>
        )
      })
    }
  }

  componentWillMount() {
    //console.log(this.props);
    const { gradientsOpacityOne, gradientsOpacityTwo } = this.props;
    this.setState({ cards: [
      `rgba(0, 76, 255, ${gradientsOpacityOne}), rgba(187, 0, 255, ${gradientsOpacityTwo})`,
      `rgba(224, 255, 0, ${gradientsOpacityOne}), rgba(255, 66, 0, ${gradientsOpacityTwo})`,
      `rgba(63, 0, 255, ${gradientsOpacityOne}), rgba(255, 77, 0, ${gradientsOpacityTwo})`,
      `rgba(0, 39, 255, ${gradientsOpacityOne}), rgba(0, 255, 193, ${gradientsOpacityTwo})`,
      `rgba(149, 255, 0, ${gradientsOpacityOne}), rgba(255, 95, 0, ${gradientsOpacityTwo})`,
      `rgba(203, 255, 0, ${gradientsOpacityOne}), rgba(204, 0, 255, ${gradientsOpacityTwo})`,
      `rgba(0, 132, 255, ${gradientsOpacityOne}), rgba(158, 255, 0, ${gradientsOpacityTwo})`,
      `rgba(255, 0, 153, ${gradientsOpacityOne}), rgba(195, 0, 255, ${gradientsOpacityTwo})`,
      `rgba(0, 239, 255, ${gradientsOpacityOne}), rgba(0, 255, 145, ${gradientsOpacityTwo})`,
      `rgba(0, 106, 255, ${gradientsOpacityOne}), rgba(0, 46, 255, ${gradientsOpacityTwo})`,
      `rgba(0, 169, 255, ${gradientsOpacityOne}), rgba(0, 255, 110, ${gradientsOpacityTwo})`,
      `rgba(127, 0, 255, ${gradientsOpacityOne}), rgba(255, 97, 0, ${gradientsOpacityTwo})`,
      `rgba(255, 75, 0, ${gradientsOpacityOne}), rgba(255, 96, 0, ${gradientsOpacityTwo})`,
      `rgba(0, 255, 209, ${gradientsOpacityOne}), rgba(12, 255, 0, ${gradientsOpacityTwo})`,
      `rgba(0, 70, 255, ${gradientsOpacityOne}), rgba(190, 0, 255, ${gradientsOpacityTwo})`,
      `rgba(131, 0, 255, ${gradientsOpacityOne}), rgba(0, 46, 255, ${gradientsOpacityTwo})`,
      `rgba(98, 255, 0, ${gradientsOpacityOne}), rgba(0, 145, 255, ${gradientsOpacityTwo})`,
      `rgba(159, 0, 255, ${gradientsOpacityOne}), rgba(255, 0, 210, ${gradientsOpacityTwo})`,
      `rgba(255, 209, 0, ${gradientsOpacityOne}), rgba(0, 221, 255, ${gradientsOpacityTwo})`,
      `rgba(0, 255, 40, ${gradientsOpacityOne}), rgba(255, 0, 76, ${gradientsOpacityTwo})`
    ]})
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