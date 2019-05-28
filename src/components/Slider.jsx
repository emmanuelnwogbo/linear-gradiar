import React, { Component } from 'react';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props)
    return (
      <div className="header__range">
        <div className="header__range--bar"></div>
        <div className="header__range--handle"></div>
      </div>
    )
  }
}

export default Slider;