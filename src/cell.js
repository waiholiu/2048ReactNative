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
                {this.props.text != -90 ? <Text style={{fontSize:20, textAlign:"center"}}> {this.props.text}</Text> : null}
            </View>
        );
    }
}

export default Cell;
