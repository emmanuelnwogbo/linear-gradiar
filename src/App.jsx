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
      gradientsOpacityOne: `1`,
      gradientsOpacityTwo: `1`,
      feedback_zIndex: `-1`,
      feedback_opacity: `0`,
      currentOpacityOption: 'both colors',
      feedback: `linear-gradient(to right bottom, rgb(0, 76, 255), rgb(187, 0, 255))`
    }
  }

  giveFeedBack = (feedback) => {
    this.setState({
      feedback_zIndex: `9000`,
      feedback_opacity: `1`,
      feedback
    }, () => {
      setTimeout(() => {
        this.setState({
          feedback_zIndex: `-1`,
          feedback_opacity: `0`,
        })
      }, 600);
    })
  }

  changeGradientsOpacity = (opacity) => {
    const { currentOpacityOption } = this.state;
    if (currentOpacityOption === `both colors`) {
      return this.setState({ 
        gradientsOpacityOne: opacity,
        gradientsOpacityTwo: opacity,
      });
    }

    if (currentOpacityOption === `first color`) {
      return this.setState({ 
        gradientsOpacityOne: opacity
      });
    }

    if (currentOpacityOption === `second color`) {
      return this.setState({
        gradientsOpacityTwo: opacity,
      });
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
    const { feedback, feedback_zIndex, feedback_opacity } = this.state;
    return (
      <div>
        <div className="feedback" style={{
          background: feedback,
          zIndex: feedback_zIndex,
          opacity: feedback_opacity
        }}>
          <div className="feedback--text">
            <p className="feedback--text-copied">copied!</p>
            <p>{feedback}</p>
          </div>
        </div>
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
        giveFeedBack={this.giveFeedBack}
        />
      </div>
    )
  }
}

export default App;