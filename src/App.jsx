import React, { Component } from 'react';

import './scss/main.scss';

import Header from './components/Header';
import Container from './components/Container';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container />
      </div>
    )
  }
}

export default App;