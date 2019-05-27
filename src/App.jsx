import React, { Component } from 'react';

import './scss/main.scss';

import Header from './components/Header';
import Container from './components/Container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generateGradients: false
    }
  }

  generateGradientsApp = () => {
    const { generateGradients } = this.state;
    if (!generateGradients) {
      this.setState({ generateGradients: true }, () => {
        this.setState({ generateGradients: false })
      })
    }
  }

  render() {
    return (
      <div>
        <Header genGradientsFunctionApp={this.generateGradientsApp}/>
        <Container generateGradients={this.state.generateGradients}/>
      </div>
    )
  }
}

export default App;