import React, { Component } from 'react';

import Header from './components/Header';
import Container from './components/Container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generateGradients: false,
      direction: `to right bottom`
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

  changeGradDirection = (direction) => {
    this.setState({ direction })
  }

  render() {
    return (
      <div>
        <Header changeGradDirection={this.changeGradDirection} genGradientsFunctionApp={this.generateGradientsApp}/>
        <Container gradiantDirection={this.state.direction} generateGradients={this.state.generateGradients}/>
      </div>
    )
  }
}

export default App;