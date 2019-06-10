import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPanel extends Component {  
  constructor(props) {
    super(props);
    this.handleMinCirclesChange = this.handleMinCirclesChange.bind(this);
    this.handleMaxCirclesChange = this.handleMaxCirclesChange.bind(this);
  }

  handleMinCirclesChange(e) {
    this.props.updateMinCirclesCount(e.target.value);
  }

  handleMaxCirclesChange(e) {
    this.props.updateMaxCirclesCount(e.target.value);
  }

  render () {
    return (
      <section className="edit-panel">
        <main>
          <section className="min-circles">
            <h3>Min Circles:</h3>
            <input
              onChange={this.handleMinCirclesChange}
              type="number"
              defaultValue={this.props.minCircles}
             />
          </section>
          <section className="max-circles">
            <h3>Max Circles:</h3>
            <input
              onChange={this.handleMaxCirclesChange}
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