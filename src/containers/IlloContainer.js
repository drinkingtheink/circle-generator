import React, { Component } from 'react'
import CircleSVG from '../components/CircleSVG';

const maxCircles = 35;
const minCircles = 8;

class IlloContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circlesModel: null
    }
    this.generateCircleModel = this.generateCircleModel.bind(this);
  }

  // generate number of circles between 10 - 25
  // generate width
  // generate top
  // generate right
  // generate opacity
  // generate z-index
  // generate fill

  generateCircleModel() {
    let circleCount = this.getRandomInt(minCircles, maxCircles);
    let circlesModel = [];
    let i;
    for (i = 0; i < circleCount; i++) { 
      circlesModel.push({ circle: true })
    }
    this.setState({ circlesModel: circlesModel })
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentWillMount() {
    this.generateCircleModel();
  }

  render() {
    return (
      <main>
        <h1>Let's Draw!</h1>

        <button className="regenerate" onClick={this.generateCircleModel}>RE-GENERATE</button>

        {this.state.circlesModel.map((item, index) => (
          <CircleSVG 
            top={`${this.getRandomInt(-100, 100)}%`} 
            right={`${this.getRandomInt(-100, 100)}%`} 
            opacity={`.${this.getRandomInt(1, 9)}`} 
            width={`${this.getRandomInt(50, 1000)}px`} 
            zIndex={`${this.getRandomInt(1, 10)}`} 
          />
        ))}
        
      </main>     
    )
  }
}

export default IlloContainer;