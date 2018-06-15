import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

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

        switch (this.props.obj.value) {
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
            color: 'white'
        }

        return cssClass;
    }


    // this bit is for all my animations
    componentDidUpdate(prevProps, prevState) {

        // console.log(this.props.obj.x);
        // console.log(this.props.obj.y);
        if (this.props.obj.isNew) {
            
            this.avCell.shake(1000);
            return;
        }

        if (this.props.obj.isMerged) {
            this.avCell.bounceIn();
        }
        else {
            if (this.props.obj.value != 0) {
                console.log('here');
                console.log(this.props.obj.x);
                console.log(this.props.obj.y);
                console.log(this.props.obj.value);
                // if (this.props.obj.originalX < this.props.obj.x) {

                //     this.avCell.bounceInLeft();
                // }
                // if (this.props.obj.originalX > this.props.obj.x) {

                //     this.avCell.bounceInRight();
                // }

                let diffY = (this.props.obj.originalY - this.props.obj.y) * 80;
                let diffX = (this.props.obj.originalX - this.props.obj.x) * 80;

                this.avCell.transition({ translateX: diffX, translateY: diffY, opacity: 0 }, { translateX: 0, translateY: 0, opacity: 1, }, 300);

                // if (diffX != 0) {
                //     this.avCell.transition({ translateX: diffX, opacity: 0 }, { translateX: 0, opacity: 1, }, 300);
                // }
                // if (diffY != 0) {
                //     this.avCell.transition({ translateY: diffY, opacity: 0 }, { translateY: 0, opacity: 1, }, 300);
                // }
            }

        }

    }


    render() {


        return (
            <Animatable.View style={this.viewStyle()} ref={ref => this.avCell = ref}  >
                {<Text style={this.cellColor()}>{this.props.obj.value}</Text>}
            </Animatable.View>
        );
    }
}


export default Cell;
