import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Board from './src/board';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      boardValues: [
        { x: 0, y: 0, value: 0 },
        { x: 1, y: 0, value: 0 },
        { x: 2, y: 0, value: 0 },
        {
          x: 3, y: 0, value: 2
        },
        { x: 0, y: 1, value: 2 },
        { x: 1, y: 1, value: 0 },
        { x: 2, y: 1, value: 0 },
        { x: 3, y: 1, value: 4 },
        { x: 0, y: 2, value: 0 },
        { x: 1, y: 2, value: 4 },
        { x: 2, y: 2, value: 0 },
        { x: 3, y: 2, value: 0 },
        { x: 0, y: 3, value: 4 },
        { x: 1, y: 3, value: 0 },
        { x: 2, y: 3, value: 0 },
        { x: 3, y: 3, value: 2 }
      ]
    };
  }


  render() {
    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        style={styles.container}>


        <Board boardValues={this.state.boardValues} />
        <Button
          onPress={() => this.onPressStart()}
          title="Start"
          color="#841584"
        />

      </GestureRecognizer>
    );
  }

  onPressStart() {
    this.resetBoard();
  }

  resetBoard() {
    this.setState({
      boardValues: [
        { x: 0, y: 0, value: 0 },
        { x: 1, y: 0, value: 0 },
        { x: 2, y: 0, value: 0 },
        { x: 3, y: 0, value: 2 },
        { x: 0, y: 1, value: 2 },
        { x: 1, y: 1, value: 0 },
        { x: 2, y: 1, value: 0 },
        { x: 3, y: 1, value: 4 },
        { x: 0, y: 2, value: 0 },
        { x: 1, y: 2, value: 4 },
        { x: 2, y: 2, value: 0 },
        { x: 3, y: 2, value: 0 },
        { x: 0, y: 3, value: 4 },
        { x: 1, y: 3, value: 0 },
        { x: 2, y: 3, value: 0 },
        { x: 3, y: 3, value: 2 }
      ]
    });
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    console.log('swipe3');
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.makeMove("y", "negative");
        break;
      case SWIPE_DOWN:
        this.makeMove("y", "positive");
        break;
      case SWIPE_LEFT:
        this.makeMove("x", "negative");
        break;
      case SWIPE_RIGHT:
        this.makeMove("x", "positive");
        break;
    }
  }

  makeMove(axis, direction) {

    // make sure groups of cells is all in order
    let groupsOfCells = [];
    for (let j = 0; j < 4; j++) {
      if (axis == "y") {
        groupsOfCells[j] = this.state.boardValues.filter(c => c.x == j).sort((a,b) => a.y - b.y);
      }
      else {
        groupsOfCells[j] = this.state.boardValues.filter(c => c.y == j).sort((a,b) => a.x - b.x);
      }

      if (direction == "positive") {
        groupsOfCells[j] = groupsOfCells[j].reverse();
      }

    }

    groupsOfCells.forEach(group => {

      let newOrderOfCells = [];
      let zeroCells = [];

      // if it is not, look at next one, if same, double this one, make the other one zero
      for (let i = 0; i < 4; i++) {
        if (group[i].value == 0) {
          // if it is a zero, move to the end
          zeroCells.push(group[i]);
        }
        else {
          newOrderOfCells.push(group[i]);
        }

      }
      zeroCells.forEach(zCell => {
        newOrderOfCells.push(zCell);
      });

      group = newOrderOfCells;

      let newPosition = direction == "negative" ? 0 : 3;
      let iterator = direction == "negative" ? 1 : -1;
      let j = 0;

      // for (let i = start; i >= 0 && i < 4; i = i + iterator) {
      //   if (axis == "y")
      //     newOrderOfCells[i].y = i;
      //   else
      //     newOrderOfCells[i].x = i;

      //   j++;
      // }

      for (let i = 0; i < 4; i++) {
        if (axis == "y")
          newOrderOfCells[i].y = newPosition;
        else
          newOrderOfCells[i].x = newPosition;

          newPosition = newPosition + iterator;
      }
      console.log('fdsa');
      console.log(group);

      this.setState({ boardValues: this.state.boardValues });
    });

  }


  // makeMove(axis, direction) {
  //   let groupsOfCells = [];
  //   for (let j = 0; j < 4; j++) {
  //     if (axis == "y") {
  //       groupsOfCells[j] = this.state.boardValues.filter(c => c.x == j);
  //     }
  //     else {
  //       groupsOfCells[j] = this.state.boardValues.filter(c => c.y == j);
  //     }

  //     groupsOfCells[j].sortOrder = j;
  //   }


  //   groupsOfCells.forEach(group => {

  //     let sortFunction = function (a, b) {

  //       let sortOrder = direction == "positive" ? 1 : -1;
  //       if (a.value == 0)
  //         return -1 * sortOrder;
  //       if (b.value == 0)
  //         return 1 * sortOrder;
  //       if (axis == "x")
  //         return (a.x - b.x);
  //       else
  //         return (a.y - b.y);

  //     }

  //     let sortedCells = group.sort((a, b) => sortFunction(a, b));



  //     for (let i = 0; i < 4; i++) {
  //       sortedCells[i].sortOrder = i;
  //       if (axis == "y")
  //         sortedCells[i].y = i;
  //       else
  //         sortedCells[i].x = i;

  //     }



  //   });

  //   this.setState({ boardValues: this.state.boardValues });
  // }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
