
const Geocoder = {
  forward (keywords) {
    var encoded = encodeURIComponent(keywords);
    console.log('keywords: ', encoded);
    return fetch(`http://nominatim.openstreetmap.org/search?format=json&q=${encoded}&addressdetails=1`);
  },
  reverse (lat, lon) {
    return fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`);
  }
};

export default Geocoder;
