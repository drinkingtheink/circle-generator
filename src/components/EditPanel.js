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

  debouncedOnChange(newNumber, updateMin) {
    if (updateMin) {
      this.handleMinCirclesChange(newNumber);
    } else {
      this.handleMaxCirclesChange(newNumber);
    }
  }

  handleMinCirclesChange(newNumber) {
    this.props.updateMinCirclesCount(newNumber);
  }

  handleMaxCirclesChange(newNumber) {
    this.props.updateMaxCirclesCount(newNumber);
  }

  render () {
    return (
      <section className="edit-panel">
        <main>
          <section className="min-circles">
            <h3>Min Circles:</h3>
            <input
              onChange={(e) => this.onChange(true, e)}
              type="number"
              defaultValue={this.props.minCircles}
             />
          </section>
          <section className="max-circles">
            <h3>Max Circles:</h3>
            <input
              onChange={(e) => this.onChange(false, e)}
              type="number"
              defaultValue={this.props.maxCircles}
             />
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
  updateMaxCirclesCount: PropTypes.func 
};

export default EditPanel;