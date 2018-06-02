import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Cell from './cell'

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boardValues: [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        }
    }

    render() {
        return (
            <View style={
                styles.board
            }>
                {this.state.boardValues.map((row, i) => {
                    console.log('row' + row);
                    return (
                        <View key={i} style={{ flexDirection: 'row' }}>

                            {/* to do not sure why the map thing doesn't work */}
                            <Cell key='0' text={row[0]}/>
                            <Cell key='1' text={row[1]}/>
                            <Cell key='2' text={row[2]}/>
                            <Cell key='3' text={row[3]}/>
                            {/* {
                                row.map((cell, j) => {
                                    console.log('cell' + cell);
                                    return
                                    (
                                        // <Cell text={cell} key={j} />
                                        <Text key={j}>d</Text>

                                    )

                                })
                            } */}
                        </View>
                    )

                })}

            </View>
        );
    }

}

const styles = StyleSheet.create({
    board: {
        flex: 1, flexDirection: 'column', justifyContent: 'center'
    },
});




export default Board;
