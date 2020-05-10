import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import CircleButton from './components/CircleButton'
import ActionPad from './components/ActionPad'
// import { Circle } from 'react-native-svg';
// const SvgText = Svg.Text

const BASE_URL = 'http://192.168.43.243:3000'
const WS = 'ws://10.42.0.1:8080'
// ws = new EventSource()
// const ws = new WebSocket(WS)

export default class App extends React.Component {
  constructor(props) {
    super(props)

    // ws.onclose = () => {
    //   console.log('closed')
    // }
  }

  componentDidMount () {
    console.log('component mounted')
  }

  componentWillUnmount () {
    // ws.close()
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Connected to {BASE_URL}</Text>
        <ActionPad></ActionPad>
      </View>
      )
    }
}


async function sendEventOld(data) {
  await fetch(`${BASE_URL}/e?d=${data}`)
  return 0
}

async function sendEvent(data) {
  return 'ok'
  // await ws.send(data)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
