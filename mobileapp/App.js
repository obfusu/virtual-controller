import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Dialog from 'react-native-dialog'
import CircleButton from './components/CircleButton'
import ActionPad from './components/ActionPad'
import * as ScreenOrientation from 'expo-screen-orientation'
// import { Circle } from 'react-native-svg';
// const SvgText = Svg.Text

import backend from './services/backend'

export default class App extends React.Component {
  state = {
    showSettings: false,
    HOST_ADDRESS: "ws://192.168.43.243:8080",
    host_input: ''
  }

  constructor(props) {
    super(props)
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  componentDidMount () {
    console.log('component mounted')
    backend.connect(this.state.HOST_ADDRESS)
  }

  componentWillUnmount () {
    console.log('component will unmount')
    backend.close()
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
        <View style={{ flexDirection: 'row'}}>
          <ActionPad></ActionPad>
          <ActionPad></ActionPad>
        </View>
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

async function sendEvent(data) {
  return 'ok'
  // await ws.send(data)
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});
