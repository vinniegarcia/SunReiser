import t from 'tcomb-form-native';

export const Range = function (min, max) {
  return t.subtype(t.Num, function (n) {
    return n >= min && n <= max;
  });
};

export const Latitude = Range(-90, 90),
  Longitude = Range(-180, 180),
  Delta = Range(0, 30);
