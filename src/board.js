import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Cell from './cell'

class Board extends Component {
    state = {}
    render() {
        return (
            <View style={{ 
                flex: 1, flexDirection: 'column', justifyContent:'center'
            }}>
                
                <View style={{ flexDirection: 'row', backgroundColor: 'powderblue' }}>
                    <Cell text='21'/>
                    <Cell  text='2'/>
                    <Cell  text='3'/>
                    <Cell  text='4'/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', height:60, alignItems: 'center', backgroundColor: 'yellow' }}>
                    <Cell  text='5'/>
                    <Cell  text='6'/>
                    <Cell  text='7'/>
                    <Cell  text='8'/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', height:60, alignItems: 'flex-end' }}>
                    <Cell  text='9'/>
                    <Cell  text='10'/>
                    <Cell  text='11'/>
                    <Cell  text='12'/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', height:60, alignItems: 'flex-end' }}>
                    <Cell  text='9'/>
                    <Cell  text='10'/>
                    <Cell  text='11'/>
                    <Cell  text='12'/>
                </View>

            </View>
        );
    }
}

export default Board;
