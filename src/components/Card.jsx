import React, { Component } from 'react';

import '../scss/components/card.scss'
//import rainbowGenerator from '../helpers/rainbow';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      gradient: false
    }
  }

  handleGradientPainting = () => {  
    const { generateGradients } = this.props;
    if (generateGradients) {
      this.generateGradient();
    }
  }

  generateGradient = () => {
    const { colors, gradient } = this.state;
    const generatedColors = this.props.generateColors(colors, gradient);
    this.setState({
      colors: generatedColors
    }, () => {
      this.setState(prevState => ({
        gradient: `linear-gradient(to bottom right, ${prevState.colors.colors[0]}, ${prevState.colors.colors[1]})`
      }))
    })
  }

  componentDidMount() {
    this.generateGradient();
  }

  componentWillUpdate() {
    this.handleGradientPainting()
  }

  render() {
    const { gradient } = this.state;
    const { generateGradients } = this.props;
    if (gradient) {
      return (
        <div className='card' style={{
          background: `${gradient}`
        }}>
          <div className="card--btn btn">copy</div>
        </div>
      )
    }
    return <div></div>
  }
}

export default Card;