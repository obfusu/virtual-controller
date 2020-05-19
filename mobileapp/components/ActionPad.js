import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CircleButton from './CircleButton'
import Svg, { Circle } from 'react-native-svg';
import backend from '../services/backend'

class ActionPad extends React.Component {
  send = (data) => {
    console.log(data)
    backend.send(data)
  }

  render() {
    return (
      <View>
        <CircleButton text="X" />
        <CircleButton text="Y" />
        <CircleButton text="A" />
        <CircleButton text="B" />
        <CircleButton text="Up" 
          onPressIn={() => { backend.send('k1') }}
          onPressOut={() => { backend.send('k0') }}
          />
        <Text>BB</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // width: "400px",
    // height: "400px",
    // backgroundColor: '#ffe',
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});


export default ActionPad
