import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Cell extends Component {
    state = {}

    viewStyle = function () {
        let cssClass = {
            justifyContent: 'center',
            borderStyle: 'solid',
            borderRadius: 4,
            borderWidth: 0.5,
            width: 80,
            height: 80
        }

        switch (this.props.text) {
            case 2:
                cssClass.backgroundColor = '#d37c14'
                break;

            case 4:
                cssClass.backgroundColor = '#ae604b'
                break;

            case 8:
                cssClass.backgroundColor = '#c6af57'
                break;

            case 16:
                cssClass.backgroundColor = '#333b57'
                break;

            case 32:
                cssClass.backgroundColor = '#68a1b4'
                break;

            case 64:
                cssClass.backgroundColor = '#d58d72'
                break;

            case 128:
                cssClass.backgroundColor = '#074b07'
                break;

            case 256:
                cssClass.backgroundColor = '#be4c91'
                break;

            case 512:
                cssClass.backgroundColor = '#8a1d23'
                break;

            case 1024:
                cssClass.backgroundColor = '#0e5382'
                break;

            case 2048:
                cssClass.backgroundColor = '#674100'
                break;

            default:
                break;
        }

        return cssClass;

    }

    cellColor = function () {

        let cssClass = {
            fontSize: 27,
            textAlign: "center",
            color:'white'
        }

        return cssClass;
    }


    render() {

        return (
            <View style={this.viewStyle()} >
                {this.props.text != -90 ? <Text style={this.cellColor()}>{this.props.text}</Text> : null}
            </View>
        );
    }
}


export default Cell;
