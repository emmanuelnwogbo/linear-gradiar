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
    let gradientsOpacity;

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
      handle.style.marginLeft = newMargLeft + "px";
      console.log(newMargLeft);
      gradientsOpacity = this.convertValueToOpacity(newMargLeft);
      if (gradientsOpacity.length > 3) {
        return;
      }

      if (gradientsOpacity <= 3) {
        changeGradientsOpacity(gradientsOpacity)
      }
      //console.log(this.convertValueToOpacity(newMargLeft), `what we want`);
      //console.log(this.convertValueToOpacity(newMargLeft).length, `what we want length`)
      //opacity = 
      //changeGradientsOpacity(opacity)
    }
    if (newMargLeft < 0) {
      handle.style.marginLeft = "0px";
      //console.log(newMargLeft)
    }
    if (newMargLeft > timelineWidth) {
      handle.style.marginLeft = timelineWidth + "px";
      //console.log(newMargLeft)
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
      //console.log('hello handle');
    }
  }

  render() {
    //console.log(this.props);
    const { animateHandle } = this.state;
    return (
      <div className="header__range" style={{
        background: 'green'
      }}>
        <div className="header__range--bar" id="opacity--range" onClick={this.moveHandle} onMouseDown={this.initMouseDown}></div>
        <div style={{
          transition: animateHandle
        }}className="header__range--handle" id="opacity--range--handle" onMouseDown={this.initMouseDown}></div>
      </div>
    )
  }
}

export default Slider;