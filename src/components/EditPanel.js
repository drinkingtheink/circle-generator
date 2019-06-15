import React, { Component } from 'react';
import PropTypes from 'prop-types';
const debounce = require('lodash.debounce');

class EditPanel extends Component {  
  constructor(props) {
    super(props);
    this.debouncedOnChange = debounce(this.debouncedOnChange.bind(this), 300);
    this.handleMinCirclesChange = this.handleMinCirclesChange.bind(this);
    this.handleMaxCirclesChange = this.handleMaxCirclesChange.bind(this);
  }

  onChange(updateMin, event) {
    this.debouncedOnChange(event.target.value, updateMin); 
  }

  debouncedOnChange(newNumber, target) {
    if (target === 'minCircles') {
      this.handleMinCirclesChange(newNumber);
    } else  if (target === 'maxCircles') {
      this.handleMaxCirclesChange(newNumber);
    } else  if (target === 'slideshowDuration') {
      this.handleSlideshowDurationChange(newNumber);
    }
  }

  handleMinCirclesChange(newNumber) {
    this.props.updateMinCirclesCount(newNumber);
  }

  handleMaxCirclesChange(newNumber) {
    this.props.updateMaxCirclesCount(newNumber);
  }

  handleSlideshowDurationChange(newNumber) {
    this.props.updateSlideshowDuration(newNumber);
  }

  render () {
    return (
      <section className="edit-panel">
        <main>
          <section className="min-circles">
            <h3>Min Circles:</h3>
            <input
              onChange={(e) => this.onChange('minCircles', e)}
              type="number"
              defaultValue={this.props.minCircles}
             />
          </section>
          <section className="max-circles">
            <h3>Max Circles:</h3>
            <input
              onChange={(e) => this.onChange('maxCircles', e)}
              type="number"
              defaultValue={this.props.maxCircles}
             />
          </section>
          <section className="slideshow-duration">
            <h3>Scene Duration:</h3>
            <input
              onChange={(e) => this.onChange('slideshowDuration', e)}
              type="number"
              defaultValue={this.props.slideshowDuration}
             />
              sec
          </section>
        </main>
      </section>
    )
  }
}

EditPanel.propTypes = {
  minCircles: PropTypes.number,
  updateMinCirclesCount: PropTypes.func,
  maxCircles: PropTypes.number,
  updateMaxCirclesCount: PropTypes.func,
  sceneDuration: PropTypes.number 
};

export default EditPanel;