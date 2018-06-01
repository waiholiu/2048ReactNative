import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Cell extends Component {
    state = {}

    
    render() {
        return (
            <View style={{               
                justifyContent: 'center',
                borderStyle:'solid',
                borderRadius: 4,
                borderWidth:0.5,  
                width:60,
                height:60
                
              }} >
                <Text> {this.props.text}</Text>
            </View>
        );
    }
}

export default Cell;
