
const Locator = () => {

  const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

  const find = (options=defaultOptions) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  let tracks = [];

  const watch = {
    start (options=defaultOptions) {
      return new Promise((resolve, reject) => {
        tracks.push(navigator.geolocation.watch(resolve, reject, options));
      });
    },
    stop (id) {
      avigator.geolocation.clearWatch(id);
      tracks.splice(tracks.indexOf(id), 1);
    },
    list () {
      //return a copy of the track listing
      return [].concat(tracks);
    }
  };

  return {
    find,
    watch
  };

};

export default Locator;
