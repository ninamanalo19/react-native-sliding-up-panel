import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import SlidingUpPanel from './SlidingUpPanel'

export default class App extends React.Component {
    constructor() {
      super();

      this.deviceHeight = Dimensions.get('window').height;
      this.deviceWidth = Dimensions.get('window').width;
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Base</Text>
        <SlidingUpPanel ref={panel => { this.panel = panel; }}
              containerMaximumHeight={this.deviceHeight-200}
              containerBackgroundColor={'transparent'}
              handlerHeight={80}
              handlerDefaultView={<View style={styles.sliderHeader}><Text>Header</Text></View>}
              allowStayMiddle={false}>
            <View style={styles.slider}>
              <Text>Slider</Text>
            </View>
            </SlidingUpPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderHeader: {
    flex: 1,
    backgroundColor: '#ff0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slider: {
    flex: 1,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
