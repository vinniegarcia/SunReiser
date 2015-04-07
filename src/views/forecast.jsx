import React from 'react-native';

let {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ListView,
} = React;

const Forecast = React.createClass({
  getDefaultProps () {
    return {
      selectedDay: Date.now()
    };
  },
  render () {
    console.log('rendering forecast');
    return (
      <View>
        <Text>Forecast</Text>
      </View>
    );
  }
});


//AppRegistry.registerComponent('Forecast', () => Forecast);

export default Forecast;
