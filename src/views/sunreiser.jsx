//libs
import React from 'react-native';

//models
import Icon from '../models/icon';


//views
import DayView from './dayView';
import Forecast from './forecast';
import LocationEditor from './locationEditor';

//styles
import styles from '../styles/sunreiserTabs';

let {
  AppRegistry,
  TabBarIOS,
  NavigatorIOS,
  Text,
  View
} = React;

const SunReiser = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },
  getDefaultProps () {
    return {
      selectedDay: Date.now()
    };
  },

  getInitialState () {
    return {
      selectedTab: 'today',
      notifCount: 0,
      presses: 0,
    };
  },

  render () {
    var passProps = this.props,
    backButtonTitle = 'Back',
    rightButtonTitle = 'Edit',
    onRightButtonPress = () => {
      this.refs.nav.push({
        title: 'Change Location',
        component: LocationEditor
      });
    },
    route = {
      title: 'SunReiser',
      component: DayView,
      passProps,
      backButtonTitle,
      rightButtonTitle,
      onRightButtonPress
    };
    return (
      <NavigatorIOS
        ref="nav"
        style={[{backgroundColor: '#ff6600'}, {flex: 1}]}
        initialRoute={route}
        itemWrapperStyle={styles.tabContent}
        tintColor="#ff6600"
        barTintColor="#373737">
      </NavigatorIOS>
    );
  }

});

export default SunReiser;
