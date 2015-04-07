import React from 'react-native';

import t from 'tcomb-form-native';
import Coordinate from '../models/coordinate';
import {MapRegionInput} from './mapViews';
import Button from './button';
import styles from '../styles/generic';

const {
  View
} = React;

const Form = t.form.Form;

const Query = t.struct({
  keywords: t.Str
});

const searchOpts = {
  auto: 'placeholders',
  fields: {
    keywords: {
      label: 'Find a place',
      placeholder: 'New York, NY 10101',
      help: 'Enter a city and state/country or a ZIP code'
    }
  }
};

const options = {
  auto: 'none',
  order: ['latitude', 'longitude', 'latitudeDelta', 'longitudeDelta'],
  fields: {
    latitude: {
      label: 'Latitude',
      placeholder: '37.5839',
    },
    longitude: {
      label: 'Longitude',
      placeholder: '-122.3549'
    },
    latitudeDelta: {
      label: 'Latitude delta',
      placeholder: '1'
    },
    longitudeDelta: {
      label: 'Longitude delta',
      placeholder: '1'
    }
  }
};

const LocationEditor = React.createClass({
  getDefaultProps () {
    return {
      region: {
        latitude: 27,
        longitude: -80,
        latitudeDelta: 1,
        longitudeDelta: 1
      },
      onChange () {

      }
    };
  },
  geocode () {

  },
  getInitialState () {
    return {};
  },
  render () {
    return (
      <View style={{marginTop: 100, paddingHorizontal: 15, flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, alignItems: 'stretch', flexDirection: 'column'}}>
          <Form ref="search" type={Query} value={this.props.keywords} options={searchOpts}/>
          <Button onPress={this.geocode} text="Search" styles={{text: { textAlign: 'center', fontSize: 20}, button: {}}}/>
        </View>
        <View style={{flex: 2}}>
          <Form ref="form" type={Coordinate} value={this.props.region} options={options}/>
        </View>
      </View>
    );
  }
});

export default LocationEditor;
