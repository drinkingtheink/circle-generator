import React, { Component } from 'react';
import CircleSVG from '../components/CircleSVG';
import EditPanel from '../components/EditPanel';
import palettes from '../palettes';

const invisibleCircle = 'rgba(000,000,000,0)';

class IlloContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleCount: null,
      circlesModel: null,
      currentPalette: null,
      slideshow: true,
      maxCircles: 100,
      minCircles: 10
    }
    this.generateCircleModel = this.generateCircleModel.bind(this);
    this.updateMaxCirclesCount = this.updateMaxCirclesCount.bind(this);
    this.updateMinCirclesCount = this.updateMinCirclesCount.bind(this);
  }

  generateCircleModel() {
    this.getPalette();
    let circleCount = this.getRandomInt(this.state.minCircles, this.state.maxCircles);
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

  updateMaxCirclesCount(newCount) {
    this.setState({ maxCircles: newCount });
    this.generateCircleModel();
  }

  updateMinCirclesCount(newCount) {
    this.setState({ minCircles: newCount });
    this.generateCircleModel();
  }

  componentWillMount() {
    this.generateCircleModel();
  }

  componentDidMount() {
    if (this.state.slideshow) {
      let react = this;
      setInterval(function() {
          react.generateCircleModel()
      }, 20 * 1000);
    }
  }
  
  styleMainBg() {
    return {
      backgroundColor: `${this.getFill()}`
    }
  }

  render() {
    return (
      <main style={this.styleMainBg()} className="illustration-container">
        <span className="arrow" />

        <header className="illustration-header">
          <h1>The Circler</h1>
          <h2>{this.state.circleCount} Circles</h2>
          <button className="regenerate" onClick={this.generateCircleModel}>Redraw</button>
        </header>

        {this.state.circlesModel.map((circle, index) => (
          <CircleSVG 
            top={`${this.getRandomInt(-80, 80)}%`} 
            right={`${this.getRandomInt(-80, 80)}%`} 
            opacity={`.${this.getRandomInt(1, 9)}`} 
            width={`${this.getRandomInt(15, 800)}px`} 
            zIndex={`${this.getRandomInt(1, 10)}`} 
            fill={this.getRandomBool() ? invisibleCircle : `${this.getFill()}`}
            key={circle.key}
            stroke={this.getRandomBool() ? `${this.getFill()}` : null}
            strokeWidth={this.getRandomBool() ? `${this.getRandomInt(2, 100)}` : null}
            strokeDasharray={this.getRandomBool() ? `${this.getRandomInt(0, 15)}, ${this.getRandomInt(0, 15)}` : null}
            animationDuration={`${this.getRandomInt(3, 20)}s`}
            animationDelay={`.${this.getRandomInt(3, 5)}s`}
            displayAnimationDuration={`.${this.getRandomInt(5, 9)}s`}
            displayAnimationDelay={`.${this.getRandomInt(3, 9)}s`}
          />
        ))}
        
        <EditPanel 
          minCircles={this.state.minCircles} 
          updateMinCirclesCount={this.updateMinCirclesCount}
          maxCircles={this.state.maxCircles} 
          updateMaxCirclesCount={this.updateMaxCirclesCount}
        />
      </main>     
    )
  }
}

export default IlloContainer;