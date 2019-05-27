import React, { Component } from 'react';

import '../scss/components/header.scss';
//import Slider from './Slider'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="header">
        <div className="header--name">lineaGradiar</div>
        <div className="header__range">
          <div className="header__range--bar"></div>
          <div className="header__range--handle"></div>
        </div>
        <div className="header--btn-tweet">Tweet</div>
      </div>
    )
  }
}

export default Header;