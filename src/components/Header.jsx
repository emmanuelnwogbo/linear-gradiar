import React, { Component } from 'react';

import '../scss/components/header.scss';
import Slider from './Slider'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [
        'to right top', 
        'to left top',
        'to right bottom', 
        'to left bottom', 
        'to right', 
        'to left', 
        'to bottom',
        'to top',
        'deg'
      ],
      currentDirection: 'to right bottom',
      initialDegree: 10,
      opacity: 'both colors',
      opacityOptions: [
        'first color',
        'second color',
        'both colors'
      ]
    }
  }

  changeGradientDirection = (direction) => {
    const { changeGradDirection } = this.props;
    if (direction === 'deg') {
      return this.setState({ currentDirection: direction }, () => {
        const { initialDegree } = this.state;
        return changeGradDirection(`${initialDegree}deg`)
      });
    }

    this.setState({ currentDirection: direction }, () => {
      const { currentDirection } = this.state;
      changeGradDirection(currentDirection)
    })
  }

  renderDirectionSpans = () => {
    const { directions, currentDirection } = this.state;
    return directions.map(direction => {
      const changeGradDir = () => {
        this.changeGradientDirection(direction)
      }
      if (direction === currentDirection) {
        return;
      }
      return <span onClick={changeGradDir} key={direction} className="header__gradient--direction-span">{direction}</span>
    })
  }

  renderDirectionSpansOpacity = () => {
    const { opacity, opacityOptions } = this.state;
    return opacityOptions.map(option => {
      if (opacity === option) {
        return;
      }
      return <span id={option} onClick={this.setOpacityOption} key={option} className="header__gradient--direction-span">{option}</span>
    })
  }

  setOpacityOption = (e) => {
    const opacity = e.target.id;
    this.setState({ opacity }, () => {
      const { changeOpacityOptions } = this.props;
      changeOpacityOptions(opacity)
    })
  }

  doNothing = () => {
    return;
  }

  increDecreDeeeg = (e) => {
    const { initialDegree } = this.state;
    const { changeGradDirection } = this.props;
    const key = e.key;
    if (key === 'ArrowUp' && initialDegree <= 99) {
      this.setState(prevState => {
        initialDegree: prevState.initialDegree+=1
      }, () => {
        const { initialDegree } = this.state;
        changeGradDirection(`${initialDegree}deg`)
        document.getElementById('deginput').value = `${initialDegree}deg`;
      })
    } else if (key === 'ArrowDown'  && initialDegree >= 1) {
      this.setState(prevState => {
        initialDegree: prevState.initialDegree-=1
      }, () => {
        const { initialDegree } = this.state;
        changeGradDirection(`${initialDegree}deg`)
        document.getElementById('deginput').value = `${initialDegree}deg`;
      })
    }
  }

  renderDegreeValues = () => {
    const { currentDirection, initialDegree } = this.state;
    if (currentDirection === 'deg') {
      return (
        <div className="header__gradient--direction-inputparent">
          <input onChange={this.doNothing} id="deginput" onKeyDown={this.increDecreDeeeg} value={`${initialDegree}deg`} className="header__gradient--direction-inputparent-input"/>
        </div>
      )
    }
  }

  openValWindow = (e) => {
    const target = e.target;
    if (target.id === `github-svg` || target.id === `github-svg-use`) {
      return window.open('https://github.com/emmanuelnwogbo/linear-gradiar', '_blank');
    }

    if (target.id === `codepen-svg` || target.id === `codepen-svg-use`) {
      return window.open('https://codepen.io/nerdyemmanuel/', '_blank');
    }
  }

  render() {
    const { genGradientsFunctionApp, changeGradientsOpacity } = this.props;
    const { currentDirection, opacity } = this.state;
    return (
      <div className="header">
      <span className="header__menuicon">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
        <div className="header--name">Gradiar</div>
        <div className="header--btn-tweet header--btn-generate" onClick={genGradientsFunctionApp}>Generate Colors</div>
        <div className="header__gradient--direction">
          <p>{currentDirection}</p>
          <div className="header__gradient--direction-menu" style={{
            zIndex: `5000`
          }}>
            {this.renderDirectionSpans()}
          </div>
        </div>
        {this.renderDegreeValues()}
        <div className="header__gradient--opacity">
          <div className="header__gradient--opacity-label">
            <p>opacity options:</p>
          </div>
          <div className="header__gradient--direction">
            <p>{opacity}</p>
            <div className="header__gradient--direction-menu header__gradient--direction-menu-opacity">
              {this.renderDirectionSpansOpacity()}
            </div>
          </div>
        </div>
        <Slider changeGradientsOpacity={changeGradientsOpacity}/>
        <div className="header__svgs">
          <svg className="header__svgs--svg" onClick={this.openValWindow} id={`github-svg`}>
            <use xlinkHref="./img/sprite.svg#icon-github1" id={`github-svg-use`}/>
          </svg>
          <svg className="header__svgs--svg" onClick={this.openValWindow} id={`codepen-svg`}>
            <use xlinkHref="./img/sprite.svg#icon-codepen" id={`codepen-svg-use`}/>
          </svg>
        </div>
        <a href="https://twitter.com/intent/tweet?button_hashtag=iloveGradiar&ref_src=twsrc%5Etfw" 
        className="twitter-hashtag-button header--btn-tweet header--btn-tweet-btnposition" 
        data-size="large" 
        data-text="check out this useful gradient generator by @nerdyemmanuel" 
        data-url="https://emmanuelnwogbo.github.io/linear-gradiar" 
        data-show-count="false">Tweet #iloveGradiar</a> 
      </div>
    )
  }
}

export default Header;
//no logs