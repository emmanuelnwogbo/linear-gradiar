import React, { Component } from 'react';

import Header from './components/Header';
import Container from './components/Container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generateGradients: false,
      direction: `to right bottom`,
      initialRender: true,
      gradientsOpacityOne: 1,
      gradientsOpacityTwo: 1,
      currentOpacityOption: 'both colors'
    }
  }

  changeGradientsOpacity = () => {
    const { currentOpacityOption } = this.state;
    if (currentOpacityOption === 'both colors') {
      return
    }

    if (currentOpacityOption === 'first color') {
      return
    }

    if (currentOpacityOption === 'second color') {
      return
    }
  }

  changeOpacityOptions = (option) => {
    this.setState({ currentOpacityOption: option })
  }

  generateGradientsApp = () => {
    const { generateGradients } = this.state;
    if (!generateGradients) {
      this.setState({ 
        generateGradients: true,
        initialRender: false
      }, () => {
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
        <Header 
        changeGradDirection={this.changeGradDirection} 
        genGradientsFunctionApp={this.generateGradientsApp}
        changeGradientsOpacity={this.changeGradientsOpacity}
        changeOpacityOptions={this.changeOpacityOptions}
        />
        <Container 
        gradientsOpacityOne={this.state.gradientsOpacityOne} 
        gradientsOpacityTwo={this.state.gradientsOpacityTwo} 
        initialRender={this.state.initialRender} 
        gradiantDirection={this.state.direction} 
        generateGradients={this.state.generateGradients}
        />
      </div>
    )
  }
}

export default App;