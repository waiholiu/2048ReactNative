import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Board from './src/board';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        boardValues: [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    }
}


  render() {
    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        style={styles.container}>


        <Board boardValues={this.state.boardValues} />
        <Button
          onPress={this.onPressStart}
          title="Start"
          color="#841584"
        />

      </GestureRecognizer>
    );
  }

  onPressStart(){
    this.state.setState({boardValues: [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]});
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: 'red' });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: 'green' });
        break;
      case SWIPE_LEFT:
        this.setState({ backgroundColor: 'blue' });
        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: 'yellow' });
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
