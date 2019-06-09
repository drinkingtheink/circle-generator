import React, { Component } from 'react';
import CircleSVG from '../components/CircleSVG';
import palettes from '../palettes';

const maxCircles = 50;
const minCircles = 15;

class IlloContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circlesModel: null,
      currentPalette: null
    }
    this.generateCircleModel = this.generateCircleModel.bind(this);
  }

  generateCircleModel() {
    this.getPalette();
    let circleCount = this.getRandomInt(minCircles, maxCircles);
    let circlesModel = [];
    let i;
    for (i = 0; i < circleCount; i++) { 
      circlesModel.push({ circle: true, key: `circle-${i++}` })
    }
    this.setState({ circlesModel: circlesModel })
  }

  getPalette() {
    let randomPalette = palettes[Math.floor(Math.random()*palettes.length)];
    this.setState({ currentPalette: randomPalette });
  }

  getFill() {
    let currentPalette = this.state.currentPalette || [];
    let randomHex = currentPalette ? currentPalette[Math.floor(Math.random()*currentPalette.length)] : [];
    return randomHex;
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
      <main className="illustration-container">
        <h1>Let's Draw!</h1>

        <button className="regenerate" onClick={this.generateCircleModel}>REGENERATE</button>

        {this.state.circlesModel.map((circle, index) => (
          <CircleSVG 
            top={`${this.getRandomInt(-100, 100)}%`} 
            right={`${this.getRandomInt(-100, 100)}%`} 
            opacity={`.${this.getRandomInt(1, 9)}`} 
            width={`${this.getRandomInt(30, 800)}px`} 
            zIndex={`${this.getRandomInt(1, 10)}`} 
            fill={this.getFill()}
            key={circle.key}
          />
        ))}
        
      </main>     
    )
  }
}

export default IlloContainer;