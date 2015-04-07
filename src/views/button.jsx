import React from 'react-native';

import core from '../styles/generic';

const {
  TouchableHighlight,
  Text
} = React;

const styles = {
  core,
  button: {
    height: 40,
    borderRadius: 6,
    //borderWidth: 1,
    //borderColor: '#cccccc'
  },
  buttonText: {
    fontWeight: "400",
    textAlign: 'right',
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#ff6600'
  }
};

const Button = React.createClass({
  getDefaultProps () {
    return {
      name: 'button1',
      text: 'Save',
      onPress: () => {
        console.log('clicked');
      },
      underlayColor: '#ffffff',
      activeOpacity: 0.3,
      styles: {
        button: {},
        text: {}
      }
    }
  },
  render () {
    return (
      <TouchableHighlight
        style={Object.assign({}, styles.button, this.props.styles.button)}
        underlayColor={this.props.underlayColor}
        activeOpacity={this.props.activeOpacity}
        onPress={this.props.onPress}>
        <Text style={Object.assign({}, styles.core.buttonText, styles.buttonText, this.props.styles.text)}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
})

export default Button;
