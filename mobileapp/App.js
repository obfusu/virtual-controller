import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Dialog from 'react-native-dialog'
import CircleButton from './components/CircleButton'
import ActionPad from './components/ActionPad'
// import { Circle } from 'react-native-svg';
// const SvgText = Svg.Text

const BASE_URL = 'http://192.168.43.243:3000'
const WS = 'ws://10.42.0.1:8080'
// ws = new EventSource()
// const ws = new WebSocket(WS)

export default class App extends React.Component {
  state = {
    showSettings: false,
    HOST_ADDRESS: "192.168.0.112:8080",
    host_input: ''
  }

  constructor(props) {
    super(props)
    this.ws = null
    // ws.onclose = () => {
    //   console.log('closed')
    // }
  }

  componentDidMount () {
    console.log('component mounted')
  }

  componentWillUnmount () {
    console.log('component will unmount')
    if (ws) {
      this.ws.close()
      this.ws = null
    }
  }

  connectToServer () {
    const hostAddress = "ws://" + this.state.HOST_ADDRESS
    const ws = new WebSocket(hostAddress)
    this.ws = ws
    console.log('connecting to ' + hostAddress)

    ws.onclose = (e) => {
      console.log('closed ' + e)
      this.ws = null
    }

    ws.onerror = (e) => {
      console.error('error ')
      console.dir(e, {depth: null})
      this.ws = null
    }

    ws.onopen = () => {
      console.log('connected to ' + hostAddress)
    }
  }

  handleHost = (host) => {
    this.setState({ host_input: host })
  }

  updateHost = () => {
    if (this.state.host_input) {
      this.setState({ HOST_ADDRESS: this.state.host_input })
      this.setState({ host_input: '' })
      this.connectToServer()
    }
    this.closeSettings()
  }

  closeSettings = () => {
    this.setState({ showSettings: false })
  }

  openSettings = () => {
    this.setState({ showSettings: true })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Connected to {this.state.HOST_ADDRESS}</Text>
        <ActionPad></ActionPad>
        <CircleButton text="S" onPressIn={this.openSettings}></CircleButton>

        <Dialog.Container visible={this.state.showSettings}>
          <Dialog.Title>Host Address</Dialog.Title>
          <Dialog.Input placeholder={this.state.HOST_ADDRESS} onChangeText={this.handleHost}></Dialog.Input>
          <Dialog.Button label="OK " onPress={this.updateHost}></Dialog.Button>
        </Dialog.Container>
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
