import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animateHandle: 'none'
    };
  }

  getElementPosition = (element) => {
    return element.getBoundingClientRect().left;
  }

  convertValueToOpacity = (value) => {
    const dec = value/100;
    const decString = dec.toString();
    const decArray = decString.split('');
    const filteredDecArray = decArray.filter(
      element => decArray.indexOf(element) <= 2
      );
    const filteredDecArrayString = filteredDecArray.toString();
    const result = filteredDecArrayString.replace(/,/g, '')

    return result;
  }

  moveHandle = (event) => {
    console.log('moving handle', event.target.id);
    const { changeGradientsOpacity } = this.props;
    const timeline = document.getElementById('opacity--range');
    const handle = document.getElementById('opacity--range--handle');
    const timelineWidth = timeline.offsetWidth - handle.offsetWidth;
    const newMargLeft = event.clientX - this.getElementPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
      handle.style.marginLeft = newMargLeft + "px";
      console.log(newMargLeft);
      let gradientsOpacity = this.convertValueToOpacity(newMargLeft);
      //console.log(gradientsOpacity)
      if (gradientsOpacity.length > 3) {
        return;
      }

      if (gradientsOpacity.length <= 3) {
        changeGradientsOpacity(gradientsOpacity)
      }
    }

    if (newMargLeft < 0) {
      handle.style.marginLeft = "0px";
      changeGradientsOpacity('0')
    }

    if (newMargLeft > timelineWidth) {
      handle.style.marginLeft = timelineWidth + "px";
      changeGradientsOpacity('1')
    }
  }

  deInitMouseDown = () => {
    const { animateHandle } = this.state;
    if (animateHandle !== 'none') {
      setTimeout(() => {
        this.setState({ animateHandle: 'none' })
      }, 200);
    }
    window.removeEventListener('mousemove', this.moveHandle, true);
  }

  initMouseDown = (event) => {
    const target = event.target.id;
    window.addEventListener('mousemove', this.moveHandle, true);
    window.addEventListener('mouseup', this.deInitMouseDown, false);

    if (target === 'opacity--range') {
      this.setState({ animateHandle: `all .1s` })
    }
    
    if (target === 'opacity--range--handle') {
      this.setState({ animateHandle: 'none' })
    }
  }

  render() {
    const { animateHandle } = this.state;
    return (
      <div className="header__range">
        <div className="header__range--bar" id="opacity--range" onClick={this.moveHandle}></div>
        <div style={{
          transition: animateHandle
        }}className="header__range--handle" id="opacity--range--handle" onMouseDown={this.initMouseDown}></div>
      </div>
    )
  }
}

export default Slider;