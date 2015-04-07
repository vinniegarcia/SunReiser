import t from 'tcomb-form-native';

import {Latitude, Longitude, Delta} from './validators/range';

const Coordinate = t.struct({
  latitude: Latitude,
  longitude: Longitude,
  latitudeDelta: Delta,
  longitudeDelta: Delta
});

export default Coordinate;
