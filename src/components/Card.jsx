import React, { Component } from 'react';

import '../scss/components/card.scss'

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: false,
      background: false,
      firstGradient: false,
      secondGradient: false,
    }
  }

  renderRgba = (color, a_value) => {
    return `rgba(${color}, ${ a_value})`;
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
    })
  }

  copyGradToClipBoard = (e) => {
    const { giveFeedBack } = this.props;
    const range = document.createRange();
    const selection = window.getSelection();
    selection.removeAllRanges();
    range.selectNodeContents(e.target.nextSibling);
    selection.addRange(range);
    document.execCommand('copy');
    giveFeedBack(e.target.previousSibling.innerHTML)
  }

  componentDidMount() {
    const { 
      initialGradient, 
    } = this.props;
    const firstGradientArr = [];
    const secondGradientArr = [];
    let tracker = 0;
    initialGradient.map(item => {
      tracker+=1;
      if (tracker <= 3) {
        return firstGradientArr.push(item)
      }
      secondGradientArr.push(item)
    });
    const firstGradientString = firstGradientArr.toString();
    const secondGradientString = secondGradientArr.toString();
    const firstGradient = firstGradientString;
    const secondGradient = secondGradientString;
    this.setState({
      firstGradient,
      secondGradient
    })
  }

  componentWillUpdate() {
    this.handleGradientPainting();
  }

  render() {
    const { firstGradient, secondGradient, colors } = this.state;
    const { 
      initialRender,
      gradiantDirection,
      gradientsOpacityOne, 
      gradientsOpacityTwo 
    } = this.props;
    if (firstGradient && secondGradient) {
      if (!initialRender && colors) {
        const newColorOne = colors.colors[0];
        const newColorTwo = colors.colors[1];
        const rgbOne = `${this.hexToRgb(newColorOne).r}, ${this.hexToRgb(newColorOne).g}, ${this.hexToRgb(newColorOne).b}`;
        const rgbTwo = `${this.hexToRgb(newColorTwo).r}, ${this.hexToRgb(newColorTwo).g}, ${this.hexToRgb(newColorTwo).b}`;
        return (
          <div className='card' style={{
            background: `linear-gradient(${gradiantDirection},rgb(${rgbOne},${gradientsOpacityOne}),rgb(${rgbTwo},${gradientsOpacityTwo}))`
          }}>
          <p style={{
            textTransform: 'lowercase',
            position: 'absolute',
            width: '10%',
            overflow: 'hidden',
            zIndex: '-1',
            opacity: '0'
          }}>{`linear-gradient(${gradiantDirection},rgba(${rgbOne},${gradientsOpacityOne}),rgba(${rgbTwo},${gradientsOpacityTwo}))`}</p>
            <div className="card--btn btn" onClick={this.copyGradToClipBoard}>copy</div>
            <p style={{
              textTransform: 'lowercase',
              position: 'absolute',
              width: '10%',
              overflow: 'hidden',
              zIndex: '-1',
              opacity: '0'
            }}>{`linear-gradient(${gradiantDirection},rgba(${rgbOne},${gradientsOpacityOne}),rgba(${rgbTwo},${gradientsOpacityTwo}));`}</p>
          </div>
        )
      }
      return (
        <div className='card' style={{
          background: `linear-gradient(${gradiantDirection},rgba(${firstGradient},${gradientsOpacityOne}),rgba(${secondGradient}, ${gradientsOpacityTwo}))`
        }}>
          <p style={{
            textTransform: 'lowercase',
            position: 'absolute',
            width: '10%',
            overflow: 'hidden',
            zIndex: '-1',
            opacity: '0'
            }}>{`linear-gradient(${gradiantDirection},rgba(${firstGradient},${gradientsOpacityOne}),rgba(${secondGradient}, ${gradientsOpacityTwo}))`}</p>
          <div className="card--btn btn" onClick={this.copyGradToClipBoard}>copy</div>
          <p style={{
            textTransform: 'lowercase',
            position: 'absolute',
            width: '10%',
            overflow: 'hidden',
            zIndex: '-1',
            opacity: '0'
            }}>{`linear-gradient(${gradiantDirection},rgba(${firstGradient},${gradientsOpacityOne}),rgba(${secondGradient}, ${gradientsOpacityTwo}));`}</p>
        </div>
      )
    }
    return <div></div>
  }
}

export default Card;