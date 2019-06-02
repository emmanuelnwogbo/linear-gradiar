import React, { Component } from 'react';
import '../scss/components/slider.scss';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 10
    };
  }

  changeValue = (e) => {
    const { value } = e.target;
    this.setState({ value });
  }

  handleInputChange = (e) => {
   const { changeGradientsOpacity } = this.props;
   const num = e.target.value;
   const decimal = num/100;
   const str = decimal.toString();
   const arr = Array.from(str);
   const arr2 = []

   if(arr.length === 4) {
     let tracker = 0;
     arr.map(elem => {
       tracker+=1;
       if (tracker === 3) {
        arr2.push(`${elem}.`)
       }
       if (tracker === 4) {
        arr2.push(`${elem}`)
       }
     })

     const filteredArr2 = arr2.toString();
     const result = filteredArr2.replace(/,/g, '');
     return changeGradientsOpacity(result)
   }

   return changeGradientsOpacity(1);
  }

  render() {
    const { value } = this.state;
    return (
      <div className={`slider`}>
        <input 
        onInput={this.handleInputChange} 
        className={`slider__range`} 
        min="1" max="10" type='range' value={value} step="1"
        onChange={this.changeValue}></input>
      </div>
    )
  }
}

export default Slider;