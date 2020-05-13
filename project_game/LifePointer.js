import React, { PureComponent } from "react";
import {View, Text, Animated} from 'react-native'

export default class LifePointer extends PureComponent {
  
  constructor(props) {
    super(props);
    
    renderers[this.props.id] = this;
  }	

  play = () => {};
    
  render() {
    return (
      <View 
        style={{
          overflow: "hidden",
          width: 100,
          height: 50,
          position: "absolute",
          left: 0,
          top: 0 }}
      >
          <Text style={{color: "white"}}> Życia: {this.props.lifes}</Text>
          <Text style={{color: "white"}}> Punkty: {this.props.score}</Text>
	  </View>
    );
  }
}