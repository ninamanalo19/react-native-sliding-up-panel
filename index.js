/**
* React Native Sliding Up Panel
* Copyright (C) 2015-present
* Niña Manalo
* https://github.com/ninamanalo/
* nina.manalo19@gmail.com
*/

'use strict';

import React, { Component } from 'react';
import { View, PanResponder,  Text, AppRegistry, Image} from 'react-native';
var Dimensions = require('Dimensions');

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var BASE_CONTAINER_HEIGHT = 40;

var {
  AppRegistry,
  Text,
  View,
  PanResponder,
  Image
} = React;

var SlidingUpPanel = React.createClass({

  panResponder : {},
  previousTop : -BASE_CONTAINER_HEIGHT,

  getInitialState: function() {
    return {
      handlerHeight : this.props.handlerHeight,
      containerHeight : this.props.handlerHeight,
      containerMinimumHeight : this.props.handlerHeight,
      containerMaximumHeight : this.props.containerMaximumHeight,
      containerHalfHeight : 0,
      containerBackgroundColor : this.props.containerBackgroundColor,
      containerOpacity : this.props.containerOpacity,

      handlerView : this.props.handlerDefaultView,

      handlerBackgroundColor : this.props.handlerBackgroundColor,
      handlerOpacity : this.props.handlerOpacity,

      middleList : false,
    };
  },

  componentDidMount: function() {
    var containerMinimumHeight = this.state.containerMinimumHeight;
    var containerMaximumHeight = this.state.containerMaximumHeight;
    var containerHalfHeight = this.state.containerHalfHeight;
    var containerBackgroundColor = this.state.containerBackgroundColor;
    var containerOpacity = this.state.containerOpacity;

    var handlerView = this.state.handlerView;

    var handlerHeight = this.state.handlerHeight;
    var handlerBackgroundColor = this.state.handlerBackgroundColor;
    var handlerOpacity = this.state.handlerOpacity;

    //MAKE SURE PROPERTIES ARE SET

    if (handlerHeight == undefined) {
      handlerHeight = BASE_CONTAINER_HEIGHT;
      this.setState({
        handlerHeight,
        containerMinimumHeight : BASE_CONTAINER_HEIGHT,
        containerHeight : BASE_CONTAINER_HEIGHT,
      });
    }

    if (handlerView == undefined) {
      throw "Set a handler view. Hint: It is a React Class."
    }

    if (containerMaximumHeight == undefined) {
      containerMaximumHeight = deviceHeight
      this.setState({
        containerMaximumHeight,
      });
    }

    if (containerHalfHeight == 0) {
      containerHalfHeight = Math.round((containerMaximumHeight + handlerHeight) / 2);
      this.setState({
        containerHalfHeight,
      });
    }

    if (containerBackgroundColor == undefined) {
      containerBackgroundColor = 'white'
      this.setState({
        containerBackgroundColor,
      });
    }

    if (containerOpacity == undefined) {
      containerOpacity = 1;
      this.setState({
        containerOpacity,
      });
    }

    if (handlerBackgroundColor == undefined) {
      handlerBackgroundColor = 'white';
      this.setState({
        handlerBackgroundColor,
      });
    }

    if (handlerOpacity == undefined) {
      handlerOpacity = 1;
      this.setState({
        handlerBackgroundColor,
      });
    }

  },

  render: function() {
    return (
      <View
        style = {{
          position: 'absolute',
          bottom: 0,
          opacity: this.state.containerOpacity,
          height: this.state.containerHeight,
          paddingBottom: this.state.leastContainerHeight,
          backgroundColor : this.state.containerBackgroundColor
        }}>
        <View
          style = {{
            height : this.state.handlerHeight,
            width : deviceWidth,
            justifyContent : 'center',
            opacity : this.state.handlerOpacity,
            backgroundColor : this.state.handlerBackgroundColor}}
          {...this.panResponder.panHandlers}>
          {this.state.handlerView}
        </View>
        {this.props.children}
      </View>
    );
  },

  componentWillMount: function() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
      onPanResponderStart: this.handlePanResponderStart
    });
  },

  handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    return true;
  },

  handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    return true;
  },

  handlePanResponderMove: function(e: Object, gestureState: Object) {
    var dy = gestureState.dy;
    var y0 = gestureState.y0;
    var negativeY = -dy;

    var positionY = negativeY - this.previousTop;

    if (positionY >= this.state.containerMinimumHeight && positionY <= this.state.containerMaximumHeight) {

      var lessMiddle = this.state.containerHalfHeight - 35;
      var moreMiddle = this.state.containerHalfHeight + 35;

      if (positionY >= lessMiddle && positionY <= moreMiddle) {

        this.setState({
          containerHeight : this.state.containerHalfHeight,
          middleList : true,
        });
        if (this.props.getContainerHeight != undefined) {
          this.props.getContainerHeight(this.state.containerHalfHeight);
        }

      } else {

        this.setState({
          containerHeight : positionY,
          middleList : false
        });

        //this.props.getContainerHeight(positionY);
      }
    }
  },

  handlePanResponderStart: function(e: Object, gestureState: Object) {
    var dy = gestureState.dy;
    var negativeY = -dy;
    this.previousTop = negativeY - this.state.containerHeight;
    this.setState({
      middleList : false
    });

  },

  handlePanResponderEnd: function(e: Object, gestureState: Object) {

    var containerHeight = this.state.containerMaximumHeight;
    var dy = gestureState.dy;
    var y0 = gestureState.y0;

    if (dy == 0) {
      var newContainerHeight = this.state.containerHalfHeight;
      var middleList = true;

      if (this.state.containerHeight == this.state.containerHalfHeight || this.state.containerHeight == this.state.containerMaximumHeight) {
        newContainerHeight = this.state.containerMinimumHeight;
        middleList = false;
      }

      this.setState({
        containerHeight : newContainerHeight,
        middleList : middleList,
      });
      if (this.props.getContainerHeight != undefined) {
        this.props.getContainerHeight(newContainerHeight);
      }
    } else {

      if (dy < 0) {

        containerHeight = this.state.containerMaximumHeight;
        this.previousTop += dy;
      } else {

        containerHeight = this.state.containerMinimumHeight;
        this.previousTop = -this.state.containerMinimumHeight;
      }

      if (!this.state.middleList) {
        this.setState({
          containerHeight : containerHeight,
        });
        if (this.props.getContainerHeight != undefined) {
          this.props.getContainerHeight(containerHeight);
        }
      }

    }
  },

});

module.exports = SlidingUpPanel;
