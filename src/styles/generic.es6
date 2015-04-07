import {
  StyleSheet,
  PixelRatio
}
from 'react-native';

var styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    position: 'relative',
    padding: 0,
    margin: 0,
    backgroundColor: '#ffffff'
  },
  containerdark: {
    backgroundColor: '#373737',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    position: 'relative',
    padding: 0,
    margin: 0
  },
  actionImage: {
    width: 50,
    height: 50,
    backgroundColor: '#676767'
  },
  buttonText: {
    fontWeight: '300',
    fontSize: 16,
    height: 40,
    paddingHorizontal: 15,
    color: '#000000'
  },
  label: {
    fontWeight: '300',
    fontSize: 16,
    height: 40,
    width: 160,
    paddingHorizontal: 15,
    color: '#000000'
  },
  text: {
    fontWeight: '100',
    fontSize: 24,
    height: 40,
    paddingHorizontal: 15,
    color: '#000000'
  },
  darklabel: {
    fontWeight: '300',
    fontSize: 16,
    height: 40,
    width: 160,
    paddingHorizontal: 15,
    color: '#dfdfdf'
  },
  darktext: {
    fontWeight: '100',
    fontSize: 24,
    height: 40,
    paddingHorizontal: 15,
    color: '#dfdfdf'
  },
  plainview: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  colview: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  darkview: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#373737'
  },
  darkcol: {
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#373737'
  }
};

export default styles;
