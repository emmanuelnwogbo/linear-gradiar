import React, { Component } from 'react';

import '../scss/components/card.scss'

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      gradient: false,
      gradiantDirection: `to right bottom`
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
    const { gradiantDirection, generateColors } = this.props;
    const generatedColors = generateColors(colors, gradient);
    this.setState({
      colors: generatedColors
    }, () => {
      this.setState(prevState => ({
        gradient: `${prevState.colors.colors[0]}, ${prevState.colors.colors[1]}`
      }))
    })
  }

  componentDidMount() {
    const { initialGradient } = this.props;
    this.setState({ gradient: initialGradient })
  }

  componentWillUpdate() {
    this.handleGradientPainting()
  }

  render() {
    const { gradient } = this.state;
    const { generateGradients, gradiantDirection } = this.props;

    if (gradient) {
      return (
        <div className='card' style={{
          background: `linear-gradient(${gradiantDirection}, ${gradient})`
        }}>
          <div className="card--btn btn">copy</div>
        </div>
      )
    }
    return <div></div>
  }
}

export default Card;