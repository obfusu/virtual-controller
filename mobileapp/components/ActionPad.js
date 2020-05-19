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
      <View style={styles.container}>
        <View style={ styles.buttonRow }>
          <CircleButton text="X" />
        </View>
        <View style={ styles.buttonRow }>
          <CircleButton text="Y" />
          <CircleButton text="A" />
        </View>
        <View style={ styles.buttonRow }>
          <CircleButton text="B" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: 'lightblue',
    justifyContent: 'center'
    // flex: 0,
    // width: "400px",
    // height: "400px",
    // backgroundColor: '#ffe',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  buttonRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  }
});


export default ActionPad
