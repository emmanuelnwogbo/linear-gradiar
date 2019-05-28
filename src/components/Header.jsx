import React, { Component } from 'react';

import '../scss/components/header.scss';
//import Slider from './Slider'

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
      initialDegree: 10
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

  render() {
    const { genGradientsFunctionApp } = this.props;
    const { currentDirection } = this.state;
    return (
      <div className="header">
        <div className="header--name">Gradiar</div>
        <div className="header--btn-tweet header--btn-generate" onClick={genGradientsFunctionApp}>Generate Colors</div>
        <div className="header__gradient--direction">
          <p>{currentDirection}</p>
          <div className="header__gradient--direction-menu">
            {this.renderDirectionSpans()}
          </div>
        </div>
        {this.renderDegreeValues()}
        <div className="header__range">
          <div className="header__range--bar"></div>
          <div className="header__range--handle"></div>
        </div>
        <div className="header__svgs">
          <svg className="header__svgs--svg">
            <use xlinkHref="./img/sprite.svg#icon-github1" />
          </svg>
          <svg className="header__svgs--svg">
            <use xlinkHref="./img/sprite.svg#icon-codepen" />
          </svg>
        </div>
        <div className="header--btn-tweet">Tweet</div>
      </div>
    )
  }
}

export default Header;