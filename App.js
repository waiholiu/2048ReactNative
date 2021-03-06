import React from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from 'react-native';
import Board from './src/board';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import * as Animatable from 'react-native-animatable';
import loadAnimations from './src/shared/animations';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      boardValues: this.generateNewBoard(),
      totalScore: 0
    };

    loadAnimations();
  }


  render() {

    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 50
    };


    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        style={styles.container}
        config={config}>

        <Board boardValues={this.state.boardValues} />

        <Text>Total Score</Text>
        <Animatable.Text ref={ref => this.avTotalScore = ref} style={{ fontSize: 44 }} >{this.state.totalScore}</Animatable.Text>


        <Animatable.View ref={ref => this.avResetButton = ref} style={{  marginBottom:40 }}>
          <Button
            onPress={() => this.onPressReset()}
            title="Reset"
            color="#841584"
            
          />
        </Animatable.View>

      </GestureRecognizer>
    );
  }

  onPressReset() {
    this.avResetButton.jello();
    this.resetBoard();
  }

  resetBoard() {
    let boardValues = this.generateNewBoard();

    this.setState({
      boardValues: boardValues,
      totalScore: 0
    });

    // this.avTotalScore.lightSpeedIn(500).then(() => { this.avTotalScore.bounce(500) });
    this.avTotalScore.bounceInRight(200);

  }

  generateNewBoard() {
    let boardValues = [
      { x: 0, y: 0, value: 0 },
      { x: 1, y: 0, value: 0 },
      { x: 2, y: 0, value: 0 },
      {
        x: 3, y: 0, value: 0
      },
      { x: 0, y: 1, value: 0 },
      { x: 1, y: 1, value: 0 },
      { x: 2, y: 1, value: 0 },
      { x: 3, y: 1, value: 0 },
      { x: 0, y: 2, value: 0 },
      { x: 1, y: 2, value: 0 },
      { x: 2, y: 2, value: 0 },
      { x: 3, y: 2, value: 0 },
      { x: 0, y: 3, value: 0 },
      { x: 1, y: 3, value: 0 },
      { x: 2, y: 3, value: 0 },
      { x: 3, y: 3, value: 0 }
    ];

    // let boardValues = [{ "x": 1, "y": 2, "value": 32, "originalX": 1, "originalY": 2, "isMerged": null, "isNew": null }, { "x": 2, "y": 2, "value": 4, "originalX": 2, "originalY": 2, "isMerged": null, "isNew": null }, { "x": 3, "y": 2, "value": 2, "originalX": 3, "originalY": 2, "isMerged": null, "isNew": null }, { "x": 0, "y": 3, "value": 0, "originalX": 2, "originalY": 3, "isMerged": null, "isNew": null }, { "x": 1, "y": 0, "value": 2, "originalX": 0, "originalY": 0, "isMerged": null, "isNew": null }, { "x": 1, "y": 1, "value": 2, "originalX": 0, "originalY": 1, "isMerged": null, "isNew": null }, { "x": 3, "y": 1, "value": 2, "isNew": null, "originalX": 2, "originalY": 1, "isMerged": null }, { "x": 2, "y": 3, "value": 8, "originalX": 1, "originalY": 3, "isMerged": null, "isNew": null }, { "x": 2, "y": 0, "value": 8, "originalX": 1, "originalY": 0, "isMerged": null, "isNew": null }, { "x": 0, "y": 1, "value": 0, "originalX": 3, "originalY": 1, "isMerged": null, "isNew": null }, { "x": 1, "y": 3, "value": 2, "originalX": 0, "originalY": 3, "isMerged": null, "isNew": null }, { "x": 3, "y": 0, "value": 2, "originalX": 2, "originalY": 0, "isMerged": null, "isNew": null }, { "x": 0, "y": 2, "value": 8, "originalX": 0, "originalY": 2, "isMerged": null, "isNew": null }, { "x": 2, "y": 1, "value": 8, "originalX": 1, "originalY": 1, "isMerged": null, "isNew": null }, { "x": 0, "y": 0, "value": 2, "originalX": 3, "originalY": 0, "isMerged": null, "isNew": true }, { "x": 3, "y": 3, "value": 4, "originalX": 3, "originalY": 3, "isMerged": true, "isNew": null }]
    let randomNo = Math.floor(Math.random() * 16);
    boardValues[randomNo].value = 2;
    boardValues[randomNo].isNew = true;
    return boardValues;
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    // this.setState({ gestureName: gestureName });
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

    let originalScore = this.state.totalScore;
    let originalPositions = this.state.boardValues.map(cell => { return { x: cell.x, y: cell.y, value: cell.value } });

    // remember what their original positions were
    this.state.boardValues.forEach((cell) => {
      cell.originalX = cell.x,
        cell.originalY = cell.y,
        cell.isMerged = null,
        cell.isNew = null
    })


    // make sure groups of cells is all in order
    let groupsOfCells = [];
    for (let j = 0; j < 4; j++) {
      if (axis == "y") {
        groupsOfCells[j] = this.state.boardValues.filter(c => c.x == j).sort((a, b) => a.y - b.y);
      }
      else {
        groupsOfCells[j] = this.state.boardValues.filter(c => c.y == j).sort((a, b) => a.x - b.x);
      }

      if (direction == "positive") {
        groupsOfCells[j] = groupsOfCells[j].reverse();
      }

    }

    // for each group of cells, make sure it is ordered so that numbers come first, the ones zero come last
    groupsOfCells.forEach((group, index, array) => {
      array[index] = this.orderZeroCellsToEnd(group, direction, axis);
    });

    // another pass, this time to check for merging
    groupsOfCells.forEach((group, index, array) => {
      array[index] = this.mergeSameNumberCells(group, direction, axis);
    });


    // should only generate a new cell if things change
    let hasChanged = originalPositions.some((oc) => oc.value != this.state.boardValues.find((nc) => nc.x == oc.x && nc.y == oc.y).value);

    if (hasChanged) {
      // pick a random zero and make it a 2
      this.createNewCell();

      this.setState({ boardValues: this.state.boardValues, totalScore: this.state.totalScore });

      if (originalScore != this.state.totalScore) {
        this.avTotalScore.bounce(200);
      }
    }
  }



  createNewCell() {
    let zeroCells = this.state.boardValues.filter(c => c.value == 0);

    if (zeroCells.length > 0) {
      let randomNo = Math.floor(Math.random() * zeroCells.length);
      zeroCells[randomNo].value = 2;
      zeroCells[randomNo].isNew = true;
    }
  }

  mergeSameNumberCells(group, direction, axis) {
    let newOrderOfCells = [];
    let zeroCells = [];
    // add all the non-zero cells, check if the next cell is the same, if so, set next cell to zero and double current cell
    for (let i = 0; i < 4; i++) {
      let currCell = group[i];
      let nextCell = group.length > i + 1 ? group[i + 1] : null;
      if (currCell.value == 0) {
        // if it is a zero, move to the end
        zeroCells.push(currCell);
      }
      else {
        if (nextCell != null && currCell.value == nextCell.value) {
          currCell.value = currCell.value * 2;
          currCell.isMerged = true;
          nextCell.value = 0;
          this.state.totalScore = this.state.totalScore + currCell.value;

        }
        newOrderOfCells.push(currCell);
      }
    }
    // after the non-zero cells are added, add the zero ones
    zeroCells.forEach(zCell => {
      newOrderOfCells.push(zCell);
    });

    group = newOrderOfCells;
    // sort the original cells to their new order
    let newPosition = direction == "negative" ? 0 : 3;
    let iterator = direction == "negative" ? 1 : -1;
    for (let i = 0; i < 4; i++) {
      if (axis == "y")
        newOrderOfCells[i].y = newPosition;
      else
        newOrderOfCells[i].x = newPosition;
      newPosition = newPosition + iterator;
    }
    return group;
  }

  orderZeroCellsToEnd(group, direction, axis) {
    let newOrderOfCells = [];
    let zeroCells = [];
    // add all the non-zero cells 
    for (let i = 0; i < 4; i++) {
      let currCell = group[i];
      if (currCell.value == 0) {
        // if it is a zero, move to the end
        zeroCells.push(currCell);
      }
      else {
        newOrderOfCells.push(currCell);
      }
    }
    // after the non-zero cells are added, add the zero ones
    zeroCells.forEach(zCell => {
      newOrderOfCells.push(zCell);
    });
    group = newOrderOfCells;
    // sort the original cells to their new order
    let newPosition = direction == "negative" ? 0 : 3;
    let iterator = direction == "negative" ? 1 : -1;
    for (let i = 0; i < 4; i++) {
      if (axis == "y")
        newOrderOfCells[i].y = newPosition;
      else
        newOrderOfCells[i].x = newPosition;
      newPosition = newPosition + iterator;
    }
    return group;
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
