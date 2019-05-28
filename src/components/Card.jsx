import React, { Component } from 'react';

import '../scss/components/card.scss'

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      gradient: false,
      gradiantDirection: `to right bottom`,
      background: null
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

  copyGradToClipBoard = (e) => {
    let range = document.createRange();
    let selection = window.getSelection();
    selection.removeAllRanges();
    console.log(e.target.previousSibling)
    range.selectNodeContents(e.target.previousSibling);
    selection.addRange(range);
    document.execCommand('copy');
  }

  componentDidMount() {
    const { initialGradient } = this.props;
    this.setState({ gradient: initialGradient })
  }

  componentWillUpdate() {
    this.handleGradientPainting();
  }

  render() {
    const { gradient } = this.state;
    const { generateGradients, gradiantDirection } = this.props;

    if (gradient) {
      return (
        <div className='card' style={{
          background: `linear-gradient(${gradiantDirection}, ${gradient})`
        }}>
        <p style={{
          textTransform: 'lowercase',
          position: 'absolute',
          width: '10%',
          overflow: 'hidden',
          zIndex: '-1',
          opacity: '0'
        }}>{`linear-gradient(${gradiantDirection}, ${gradient})`}</p>
          <div className="card--btn btn" id={`linear-gradient(${gradiantDirection}, ${gradient})`} onClick={this.copyGradToClipBoard}>copy</div>
        </div>
      )
    }
    return <div></div>
  }
}

export default Card;