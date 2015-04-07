import moment from 'moment';
import {
  sin,
  cos,
  tan,
  asin,
  acos,
  atan
}
from './trig';
import convertTime from './convertTime';

const SunCalc = (options) => {

  let {
    coords: {
      latitude,
      longitude
    },
    timestamp
  } = options;

  //   offical      = 90 degrees 50'
  //   civil        = 96 degrees
  //   nautical     = 102 degrees
  //   astronomical = 108 degrees
  const zeniths = {
    official: 90 + 50 / 60,
    civil: 96,
    nautical: 102,
    astronomical: 108
  };

  let rising = true;

  if (!timestamp) {
    timestamp = Date.now();
  }

  const longHour = longitude / 15,
    offset = moment(timestamp).utcOffset() / 60;

  const getDOY = () => {
      return moment(timestamp).utc().dayOfYear();
    },

    approximateTime = (doy, rising) => {
      const doy = getDOY(timestamp),
        factor = (rising) ? 6 : 18;
      return doy + ((factor - longHour) / 24);
    },

    meanAnomaly = (approxTime) => {
      return (0.9856 * approxTime) - 3.289;
    },

    trueLongitude = (mean) => {
      //use the result of meanAnomaly() here
      const trueLon = mean + (1.916 * sin(mean)) + (0.020 * sin(2 * mean)) + 282.634;
      return trueLon % 360;
    },

    quadrant = (angle) => {
      return (Math.floor(angle / 90)) * 90;
    },

    rightAscension = (trueLon) => {
      //use the result of trueLon() here
      let rightAsc = atan(0.91764 * tan(trueLon));
      rightAsc %= 360;

      var leftQuad = quadrant(trueLon);
      var rightQuad = quadrant(rightAsc);
      rightAsc = rightAsc + (leftQuad - rightQuad);
      rightAsc /= 15;

      return rightAsc;
    },

    sinDec = (trueLon) => {
      return 0.39782 * sin(trueLon);
    },

    cosDec = (trueLon) => {
      return cos(asin(sinDec(trueLon)));
    },

    localMeanTime = (rising) => {
      const approxTime = approximateTime(getDOY(), rising),
        trueLon = trueLongitude(meanAnomaly(approxTime)),
        sindec = sinDec(trueLon),
        sinlat = sin(latitude),
        coslat = cos(latitude),
        cosdec = cosDec(trueLon),
        cosHorizon = (cos(zeniths.official) - (sindec * sinlat)) / (cosdec * coslat);

      if (cosHorizon > 1) {
        return "the sun never rises on this location (on the specified date)";
      } else if (cosHorizon < -1) {
        return "the sun never sets on this location (on the specified date)";
      } else {
        let angHorizon = rising ? 360 - acos(cosHorizon) : acos(cosHorizon);
        angHorizon /= 15;
        const rightAsc = rightAscension(trueLon);
        const meanTime = angHorizon + rightAsc - (0.06571 * approxTime) - 6.622;
        return meanTime;
      }
    },

    hoursRange = (h) => {
      return (h + 24) % 24;
    },

    UTCTime = (rising) => {
      let meanTime = localMeanTime(rising);
      let utc = meanTime - longHour;
      return hoursRange(utc);
    },

    sunriseUtcFriendly = () => {
      return convertTime(sunriseUtcHours());
    },

    sunsetUtcFriendly = () => {
      return convertTime(sunsetUtcHours());
    },

    sunriseLocalFriendly = () => {
      const localDec = sunriseLocalHours(offset);
      return convertTime(localDec);
    },

    sunsetLocalFriendly = () => {
      const localDec = sunsetLocalHours(offset);
      return convertTime(localDec);
    },

    sunriseUtcHours = () => {
      rising = true;
      return UTCTime(rising);
    },

    sunsetUtcHours = () => {
      rising = false;
      return UTCTime(rising);
    },

    sunriseLocalHours = (gmt) => {
      return hoursRange(gmt + sunriseUtcHours());
    },

    sunsetLocalHours = (gmt) => {
      return hoursRange(gmt + sunsetUtcHours());
    },

    isDaylight = (nao) => {
      const sunrise = sunriseUtcHours(),
        sunset = sunsetUtcHours();

      let isDaylight = false;

      if (sunrise > sunset) {
        if (sunset > nao) {
          isDaylight = true;
        }
      } else {
        isDaylight = (sunset > nao);
      }
      return isDaylight;
    };

  //return a sane api for x sake
  return {
    coords: {
      latitude,
      longitude
    },
    isDaylight: isDaylight(timestamp),
    local: {
      sunrise: sunriseLocalFriendly(),
      sunset: sunsetLocalFriendly()
    },
    utc: {
      sunrise: sunriseUtcFriendly(),
      sunset: sunsetUtcFriendly()
    }
  };
};

export default SunCalc;
