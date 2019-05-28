import React, { Component } from 'react';

import '../scss/components/card.scss'

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      gradient: false,
      gradiantDirection: `to right bottom`,
      background: null,
      rgb: ['r', 'g', 'b'],
    }
  }

  hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  handleGradientPainting = () => {  
    const { generateGradients } = this.props;
    if (generateGradients) {
      this.generateGradient();
    }
  }

  generateGradient = () => {
    const { colors, gradient } = this.state;
    const { generateColors } = this.props;
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
    const range = document.createRange();
    const selection = window.getSelection();
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
    const { gradiantDirection, initialRender } = this.props;

    if (gradient) {
      let background = `linear-gradient(${gradiantDirection}, ${gradient})`
      if (!initialRender) {
        background = `linear-gradient(${gradiantDirection}, ${gradient})`;
      }
      //console.log(`these are the gradients`, gradient);
      //console.log( `linear-gradient(${gradiantDirection}, ${gradient})`);
      const valueToBeCopied = `linear-gradient(${gradiantDirection}, ${gradient})`;

      return (
        <div className='card' style={{
          background
        }}>
        <p style={{
          textTransform: 'lowercase',
          position: 'absolute',
          width: '10%',
          overflow: 'hidden',
          zIndex: '-1',
          opacity: '0'
        }}>{valueToBeCopied}</p>
          <div className="card--btn btn" id={`linear-gradient(${gradiantDirection}, ${gradient})`} onClick={this.copyGradToClipBoard}>copy</div>
        </div>
      )
    }
    return <div></div>
  }
}

export default Card;