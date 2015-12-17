'use strict';

var React = require('react-native');
var SlidingUpPanel = require('react-native-sliding-up-panel');
var Dimensions = require('Dimensions');
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var MAXIMUM_HEIGHT = deviceHeight - 100;
var MINUMUM_HEIGHT = 80;

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableHighlight,
  Image
} = React;

var SampleApp = React.createClass({
  render: function() {
    return (
      <View style={styles.parentContainer}>
        <View style={styles.backContainer}>
          <Text style={styles.logText}>Panel Height: {this.state.containerHeight}</Text>
        </View>
        <SlidingUpPanel 
            ref="panel"
            containerMaximumHeight={MAXIMUM_HEIGHT}
            containerBackgroundColor={'green'}
            handlerHeight={MINUMUM_HEIGHT}
            handlerDefaultView={<HandlerOne/>}
            getContainerHeight={this.getContainerHeight}>
          <View style={styles.frontContainer}>
            <Text style={styles.panelText}>Hello guys!</Text>
          </View>
        </SlidingUpPanel>
      </View>
      )
  },

  getContainerHeight: function(containerHeight) {
    this.setState({
      containerHeight : containerHeight
    });
  },

  getInitialState: function() {
    return {
      containerHeight : 0
    }
  },

});

var HandlerOne = React.createClass({
  render: function() {
    return (
      <Image style={styles.image} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Cloud_banner.jpg'}}>
        <View style={styles.textContainer}>
          <Text style={styles.handlerText}>Another Sample Text</Text>    
        </View>
      </Image>
    );
  }
});

var HandlerTwo = React.createClass({
  render: function() {
    return (
      <TouchableHighlight style={styles.button} underlayColor='transparent' onPress={this.onPress}>
        <Text style={styles.handlerText}>Tap me!</Text>
      </TouchableHighlight>
    );
  },

  onPress: function() {
    AlertIOS.alert('Event Happened', 'You just tapped the button!', [{text: 'OK'}]);
  }
});

var styles = StyleSheet.create({
  parentContainer: {
    flex : 1,
    paddingTop: 60
  },

  backContainer: {
    flex : 1,
    backgroundColor : 'blue'
  },

  frontContainer: {
    flex : 1,
  },

  logText: {
    color : 'white',
    fontWeight: '700',
  },

  panelText: {
    color : 'white',
  },

  image: {
    height : MINUMUM_HEIGHT,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor : 'gray'
  },

  textContainer: {
    backgroundColor : 'transparent',
    height : MINUMUM_HEIGHT,
    justifyContent : 'center'
  },

  handlerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },

  button: {
    backgroundColor : 'black',
    justifyContent : 'center',
    alignSelf : 'center',
    padding: 5
  }

});

AppRegistry.registerComponent('SampleApp', () => SampleApp);
