import React from 'react';
import { TouchableOpacity, View, TouchableHighlight } from 'react-native-gesture-handler';
import Svg, { Circle, Text } from 'react-native-svg';

class CircleButton extends React.Component {
  constructor(props) {
    super(props)
    this.pressed = this.pressed.bind(this)
    this.released = this.released.bind(this)
    this.outlineColor = props.outlineColor || "purple"
    this.text = props.text || "T"
    this.textColor = props.textColor || "black"
    this.onPressIn = props.onPressIn
  }

  pressed() {
    console.log(`${this.text} pressed`)
    if (this.onPressIn) {
      this.onPressIn()
    }
  }

  released() {
    console.log(`${this.text} released`)
  }


  render() {
    return (
      <TouchableOpacity onPressIn={this.pressed} onPressOut={this.released}>
      <Svg height="100px" width="100px" viewBox="0 0 100 100">
          <Circle cx="50%" cy="50%" r="30" strokeWidth="2" fill="transparent" stroke={this.outlineColor}/>
          <Text textAnchor="middle" fontSize="20" stroke={this.textColor} fill="black" x="50%" y="50%" dy="0.35em" dx="-0.2em"> {this.text} </Text>
      </Svg>
      </TouchableOpacity>
    )
  }
}

export default CircleButton
