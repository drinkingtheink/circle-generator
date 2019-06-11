import React, { Component } from 'react';
import CircleSVG from '../components/CircleSVG';
import EditPanel from '../components/EditPanel';
import palettes from '../palettes';
import CountUp from 'react-countup';

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
      minCircles: 10,
      repoLink: 'https://github.com/drinkingtheink/circle-generator',
      portfolioLink: 'http://drinkingtheink.github.io'
    }
    this.generateCircleModel = this.generateCircleModel.bind(this);
    this.updateMaxCirclesCount = this.updateMaxCirclesCount.bind(this);
    this.updateMinCirclesCount = this.updateMinCirclesCount.bind(this);
  }

  // for use with slideshow mode
  intervalID = 0;

  generateCircleModel() {
    this.getPalette();
    let circleCount = this.getRandomInt(this.state.minCircles, this.state.maxCircles);
    let circlesModel = [];
    let i;
    for (i = 0; i < circleCount; i++) { 
      circlesModel.push({ circle: true, key: `circle-${this.getRandomString()}` })
    }
    this.setState({ circlesModel: circlesModel, circleCount: circleCount })

    if (this.state.slideshow) {
      this.rebootSlideshow();
    }
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

  getRandomString() {
    return Math.random().toString(20).substring(2, 15) + Math.random().toString(20).substring(2, 15);
  }

  updateMaxCirclesCount(newCount) {
    this.setState({ maxCircles: newCount });
    this.generateCircleModel();
  }

  updateMinCirclesCount(newCount) {
    this.setState({ minCircles: newCount });
    this.generateCircleModel();
  }

  rebootSlideshow() {
    this.endSlideshow();
    this.startSlideshow();
  }

  startSlideshow() {
    let react = this;
    this.intervalID = setInterval(function() {
        react.generateCircleModel()
    }, 10 * 1000);
  }

  endSlideshow() {
    clearInterval(this.intervalID);
  }

  // Lifecycles
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
        <span className="arrow" />

        <header className="illustration-header">
          <section className="about">
            <a href={this.state.repoLink} className="about-link" target="_blank"  rel="noopener noreferrer">About this Project</a>
            <a href={this.state.portfolioLink} className="about-link" target="_blank"  rel="noopener noreferrer">About the Author</a>
          </section>
          <h1 className="app-title">The Circler</h1>
          <h2><CountUp start={0} end={this.state.circleCount} duration={1.5}>{this.state.circleCount}</CountUp> Circles</h2>
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
            animationDelay={`.${this.getRandomInt(3, 9)}s`}
            displayAnimationDuration={`${this.getRandomInt(3, 9)}s`}
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