import React from 'react-native';
import moment from 'moment';

import Icon from '../models/icon';
import styles from '../styles/generic';

const {
  View,
  Text,
  Image,
  AppRegistry
} = React;

const DayInfoRow = React.createClass({
  getDefaultProps () {
    return {
      event: 'Sunrise',
      timestamp: moment().format('hh:mm:ss a'),
      isDaylight: moment().hour() > 6 && moment().hour() < 18
    };
  },
  render () {
    let {isDaylight} = this.props,
      viewStyle = (isDaylight) ? styles.plainview : styles.darkview,
      labelStyle = (isDaylight) ? styles.label : styles.darklabel,
      textStyle = (isDaylight) ? styles.text : styles.darktext;
    return (
      <View testID="sunreiserView" style={viewStyle}>
        <Text style={labelStyle}>{this.props.event}</Text>
        <Text style={textStyle}>{this.props.timestamp}</Text>
        <Image
          style={styles.actionImage}
          source={Icon('history')}
        />
      </View>
    );
  }
});
AppRegistry.registerComponent('DayInfoRow', () => DayInfoRow);

export default DayInfoRow;
