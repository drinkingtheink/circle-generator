import React from 'react';
import PropTypes from 'prop-types';

const CircleSVG = (props) => {
  const gennedStyles = {
    position: 'absolute',
    width: props.width,
    zIndex: props.z_index,
    fill: props.fill,
    opacity: props.opacity,
    right: props.right,
    top: props.top,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    strokeDasharray: props.strokeDasharray,
    animationName: 'dash',
    animationDuration: props.animationDuration,
    animationDelay: props.animationDelay
  }

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 600 600"
      style={ gennedStyles }
    >
      <path 
        className="circle-svg-path" 
        d="M300,550A250,250,0,0,1,123.22,123.22,250,250,0,1,1,476.78,476.78,248.36,248.36,0,0,1,300,550Z"/>
    </svg>
  )
}

CircleSVG.propTypes = {
  width: PropTypes.string,
  zIndex: PropTypes.string,
  opacity: PropTypes.string,
  right: PropTypes.string,
  top: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  strokeDasharray: PropTypes.string,
  animationDuration: PropTypes.string,
  animationDelay: PropTypes.string
};

export default CircleSVG;