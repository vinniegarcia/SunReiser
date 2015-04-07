import {
  StyleSheet,
  PixelRatio
}
from 'react-native';

var styles = {
  mapview: {
    margin: 0,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0
  },
  mapcontainer: {
    margin: 0,
    flex:1,
    backgroundColor: 'pink',
    borderWidth: 1/PixelRatio.get(),
    alignItems: 'stretch',
    justifyContent: 'center'
  }
};

export default styles;
