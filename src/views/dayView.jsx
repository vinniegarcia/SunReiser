import React from 'react-native';
import moment from 'moment';

import Geocoder from '../models/geocoder';
import Icon from '../models/icon';
import Locator from '../models/locator';
import SunCalc from '../models/sunrise/sunCalc';

import LocationEditor from './locationEditor';
import DayInfoRow from './dayInfoRow';
import Button from './button';

import core from '../styles/generic';
import maps from '../styles/maps';
import dayview from '../styles/dayview';

const styles = {
  core,
  maps,
  dayview,
  button: {
    button: {height: 60}, text: {paddingVertical: 20}
  }
};

const {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  Image,
  View,
  MapView,
  ScrollView,
} = React;

let DayView = React.createClass({
  setPositionAndGeocode (position) {
    const {
      latitude,
      longitude
    } = position.coords;

    this.setState({
      region: {
        latitudeDelta: 1,
        longitudeDelta: 1,
        latitude,
        longitude
      }
    });
    return Geocoder.reverse(latitude, longitude);
  },
  setCity (json) {
    let locationDisplayName = json.address.city;
    this.setState({locationDisplayName});
  },
  getTodaysTimes (position) {
    const times = SunCalc(position);
    console.log(times);
    this.setState({
      sunriseTime: times.local.sunrise,
      sunsetTime: times.local.sunset,
      isDaylight: times.isDaylight
    });
    return position;
  },
  componentDidMount () {
    let loc = Locator();

    loc.find({
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    })
      .then(this.getTodaysTimes)
      .then(this.setPositionAndGeocode)
      .then((res) => res.json())
      .then(this.setCity)
      .catch((err) => {
        console.log(err);
      });
  },
  getInitialState () {
    return {
      region: {
        latitude: 27,
        longitude: -80,
        latitudeDelta: 1,
        longitudeDelta: 1
      },
      locationDisplayName: 'Lake Worth',
      isDaylight: true,
      sunriseTime: moment().format('hh:mm:ss a'),
      sunsetTime: moment().format('hh:mm:ss a')
    };
  },
  getDefaultProps () {
    return {
      selectedDay: moment().format('hh:mm:ss a')
    };
  },
  onMapRegionInputChange (region) {
    this.setState({region});
  },
  onChangeClick (...args) {
    this.props.navigator.push({
      title: 'Change Location',
      component: LocationEditor
    });
  },
  render () {
    let {isDaylight} = this.state,
      containerStyle = (this.state.isDaylight) ? styles.core.container : styles.core.containerdark,
      plainStyle = (this.state.isDaylight) ? styles.core.plainview : styles.dayview.darkview,
      headerStyle = (this.state.isDaylight) ? styles.dayview.header : styles.dayview.darkHeader,
      headerTextStyle = (this.state.isDaylight) ? styles.dayview.headerText : styles.dayview.darkText,
      colStyle = (this.state.isDaylight) ? styles.core.colview : styles.dayview.coldark;
    return (
      <View style={containerStyle}>
        <View testID="mapArea" style={styles.maps.mapcontainer}>
          <MapView style={styles.maps.mapview} region={this.state.region} showsUserLocation={true} />
        </View>
        <View>
          <View style={plainStyle}>
            <View style={headerStyle}>
              <Text style={headerTextStyle}>
                {this.state.locationDisplayName}
              </Text>
            </View>
            <Button onPress={this.onChangeClick} text="Change" styles={styles.button}/>
          </View>
          <View style={colStyle}>
            <DayInfoRow event="Sunrise"
              isDaylight={this.state.isDaylight}
              timestamp={this.state.sunriseTime}/>
            <DayInfoRow event="Sunset"
              isDaylight={this.state.isDaylight}
              timestamp={this.state.sunsetTime}/>
          </View>
        </View>
      </View>
    );
  }
});

AppRegistry.registerComponent('DayView', () => DayView);

export default DayView;
