import core from './generic';

const styles = {
    header: {
      flex: 1,
      width: 250,
      height: 60
    },
    headerText: Object.assign({}, core.label, {
      fontWeight: "100",
      fontSize: 36,
      width: 250
    }),
    darkHeader: {
      backgroundColor: '#373737',
      flex: 1,
      width: 250,
      height: 60
    },
    darkText: {
      color: '#dfdfdf',
      fontWeight: "100",
      fontSize: 36,
      width: 250
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
