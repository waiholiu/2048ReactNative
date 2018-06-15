import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Cell from './cell'

class Board extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let rowsOfCells = [];
        for (let y = 0; y < 4; y++) {
            rowsOfCells[y] = this.props.boardValues.filter(c => c.y == y);
        }

        return (
            <View style={
                styles.board
            }>
                {rowsOfCells.map((row, i) => {

                    return (
                        <View key={i} style={{ flexDirection: 'row' }}>
                            <Cell key='0' obj={row.find(r => r.x == 0)} />
                            <Cell key='1' obj={row.find(r => r.x == 1)} />
                            <Cell key='2' obj={row.find(r => r.x == 2)} />
                            <Cell key='3' obj={row.find(r => r.x == 3)} />
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
