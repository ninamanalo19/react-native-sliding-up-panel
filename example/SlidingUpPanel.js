/**
* React Native Sliding Up Panel
* Copyright (C) 2015-present
* Niña Manalo
* https://github.com/ninamanalo/
* nina.manalo19@gmail.com
*/

'use strict';

import React, { Component } from 'react';
import { View, PanResponder,  Text, AppRegistry, Image, Dimensions} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var BASE_CONTAINER_HEIGHT = 40;

export default class SlidingUpPanel extends Component {

  constructor(props){
    super(props);
    this.panResponder = {};
    this.previousTop = -BASE_CONTAINER_HEIGHT;
    this.mainContainerHeight = 0;
    this.state = {
      handlerHeight : this.props.handlerHeight,
      containerHeight : this.props.containerHeight,
      containerMinimumHeight : this.props.handlerHeight,
      containerMaximumHeight : this.props.containerMaximumHeight,
      containerHalfHeight : 0,
      containerBackgroundColor : this.props.containerBackgroundColor,
      containerOpacity : this.props.containerOpacity,

      handlerView : this.props.handlerDefaultView,

      handlerBackgroundColor : this.props.handlerBackgroundColor,
      handlerOpacity : this.props.handlerOpacity,
      allowStayMiddle : this.props.allowStayMiddle,

      middleList : false,
    }
  }

  componentDidMount() {
    var containerMinimumHeight = this.state.containerMinimumHeight;
    var containerMaximumHeight = this.state.containerMaximumHeight;
    var containerHalfHeight = this.state.containerHalfHeight;
    var containerBackgroundColor = this.state.containerBackgroundColor;
    var containerOpacity = this.state.containerOpacity;

    var handlerView = this.state.handlerView;

    var handlerHeight = this.state.handlerHeight;
    this.mainContainerHeight = this.state.containerHeight;
    var handlerBackgroundColor = this.state.handlerBackgroundColor;
    var handlerOpacity = this.state.handlerOpacity;

    var allowStayMiddle = this.state.allowStayMiddle;

    //MAKE SURE PROPERTIES ARE SET

    if (handlerHeight == undefined) {
      handlerHeight = BASE_CONTAINER_HEIGHT;
      this.setState({
        handlerHeight,
        containerMinimumHeight : BASE_CONTAINER_HEIGHT,
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

    if (allowStayMiddle == undefined) {
      allowStayMiddle = true;
      this.setState({
        allowStayMiddle,
      });
    }

    this.mainContainerHeight = this.state.containerMinimumHeight
    this.setState({
      containerHeight : this.mainContainerHeight
    });

    if (containerBackgroundColor == undefined) {
      containerBackgroundColor = 'transparent'
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

  }

  render() {
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
  }

  reloadHeight(height) {
    this.setState({
      containerHeight : height,
      middleList : false
    });
    this.mainContainerHeight = height;
  }

  collapsePanel() {
    this.setState({
      containerHeight: this.state.containerMinimumHeight,
    });
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder.bind(this),
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderRelease: this.handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this.handlePanResponderEnd.bind(this),
      onPanResponderStart: this.handlePanResponderStart.bind(this)
    });
  }

  handleStartShouldSetPanResponder(e: Object, gestureState: Object) {
    return true;
  }

  handleMoveShouldSetPanResponder(e: Object, gestureState: Object) {
    return true;
  }

  handlePanResponderMove(e: Object, gestureState: Object) {
    var dy = gestureState.dy;
    var y0 = gestureState.y0;
    var negativeY = -dy;

    var positionY = negativeY - this.previousTop;

    if (positionY >= this.state.containerMinimumHeight && positionY <= this.state.containerMaximumHeight) {
      //console.log('handlePanResponderMove() -- middle=' + positionY);
      var lessMiddle = this.state.containerHalfHeight - 35;
      var moreMiddle = this.state.containerHalfHeight + 35;

      if (positionY >= lessMiddle && positionY <= moreMiddle) {

        if (!this.state.allowStayMiddle) {
          this.handleMiddleFalse(positionY);
        } else {
          this.setState({
            containerHeight : this.state.containerHalfHeight,
            middleList : true,
          });

          if (this.props.getContainerHeight != undefined) {
            this.props.getContainerHeight(this.state.containerHalfHeight);
          }
        }

      } else {
        //console.log('handlePanResponderMove() -- NOT middle=' + positionY);
        this.handleMiddleFalse(positionY);
      }

      this.mainContainerHeight = this.state.containerHeight;
    }
  }

  handleMiddleFalse(positionY) {
    this.setState({
      containerHeight : positionY,
      middleList : false
    });
    if (this.props.getContainerHeight != undefined) {
      this.props.getContainerHeight(positionY);
    }
  }

  handlePanResponderStart(e: Object, gestureState: Object) {
    if(this.props.onStart !== undefined) {
      this.props.onStart();
    }

    var dy = gestureState.dy;
    var negativeY = -dy;
    this.previousTop = negativeY - this.state.containerHeight;
    this.setState({
      middleList : false
    });

  }

  handlePanResponderEnd(e: Object, gestureState: Object) {
    if(this.props.onEnd !== undefined) {
      this.props.onEnd();
    }

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

      if (!this.state.allowStayMiddle) {
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

      this.mainContainerHeight = newContainerHeight;
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

      this.mainContainerHeight = containerHeight;

    }
  }
}
