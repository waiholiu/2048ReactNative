import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Board from './src/board';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        boardValues: [
          {x: 0, y: 0, value :0},
          {x: 1, y: 0, value :0},
          {x: 2, y: 0, value :0},
          {x: 3, y: 0, value :2},
          {x: 0, y: 1, value :0},
          {x: 1, y: 1, value :0},
          {x: 2, y: 1, value :0},
          {x: 3, y: 1, value :4},
          {x: 0, y: 2, value :0},
          {x: 1, y: 2, value :4},
          {x: 2, y: 2, value :0},
          {x: 3, y: 2, value :0},
          {x: 0, y: 3, value :4},
          {x: 1, y: 3, value :0},
          {x: 2, y: 3, value :0},
          {x: 3, y: 3, value :2}          
         ]
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
    console.log('swipe');
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.swipeUp();
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

  swipeUp(){ 
    // get the 4 groups of cells
    let groupsOfCells = [];
    for (let x = 0; x < 4; x++) {
      groupsOfCells[x] = this.state.boardValues.filter(c => c.x == x);
    }

    groupsOfCells.forEach(group => {
      // find all the zeros and remove them
      let sortedCells = group.filter(cell => cell.value != 0).sort((a,b) => a.y - b.y)
      let sortedValues = sortedCells.map((cell) => cell.value);
    
      // fill out the request
      for(let i = 0; i < 4; i++)
      {
        if(sortedValues[i])
        {
          group[i].value = sortedValues[i]
        } 
        else
        {
          group[i].value = 0;
        }

      }


    });

    console.log(this.state.boardValues);

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
