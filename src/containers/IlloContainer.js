import React, { Component } from 'react';
import CircleSVG from '../components/CircleSVG';
import palettes from '../palettes';

const maxCircles = 100;
const minCircles = 10;
const invisibleCircle = 'rgba(124,240,10,0)';

class IlloContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleCount: null,
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
      circlesModel.push({ circle: true, key: `circle-${i}` })
    }
    this.setState({ circlesModel: circlesModel, circleCount: circleCount })
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

  getRandomBool() {
    let randomBoolean = Math.random() >= 0.5;
    return randomBoolean;
  }

  componentWillMount() {
    this.generateCircleModel();
  }
  
  styleMainBg() {
    return {
      backgroundColor: `${this.getFill()}`
    }
  }

  render() {
    return (
      <main style={this.styleMainBg()} className="illustration-container">
        <header className="illustrator-header">
          <h1>Let's Draw!</h1>
          <h2>Circle Count: {this.state.circleCount}</h2>

          <button className="regenerate" onClick={this.generateCircleModel}>REGENERATE</button>
        </header>

        {this.state.circlesModel.map((circle, index) => (
          <CircleSVG 
            top={`${this.getRandomInt(-100, 100)}%`} 
            right={`${this.getRandomInt(-100, 100)}%`} 
            opacity={`.${this.getRandomInt(1, 9)}`} 
            width={`${this.getRandomInt(15, 800)}px`} 
            zIndex={`${this.getRandomInt(1, 10)}`} 
            fill={this.getRandomBool() ? invisibleCircle : `${this.getFill()}`}
            key={circle.key}
            stroke={this.getRandomBool() ? `${this.getFill()}` : null}
            strokeWidth={this.getRandomBool() ? `${this.getRandomInt(2, 100)}` : null}
            strokeDasharray={this.getRandomBool() ? `${this.getRandomInt(0, 15)}, ${this.getRandomInt(0, 15)}` : null}
          />
        ))}
        
      </main>     
    )
  }
}

export default IlloContainer;