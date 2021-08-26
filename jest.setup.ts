import 'jest-preset-angular/setup-jest';

/* global mocks for jsdom */
const mockStorage = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: mockStorage() });
Object.defineProperty(window, 'sessionStorage', { value: mockStorage() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

const mockGoogle = () => {
  return {
    maps: {
      GeocoderStatus: {
        OK: 'OK',
      },
      GeocoderLocationType: {
        GEOMETRIC_CENTER: 'GEOMETRIC_CENTER',
      },
      LatLng: function (lat: string, lng: string) {
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),

          lat: function () {
            return this.latitude;
          },
          lng: function () {
            return this.longitude;
          },
        };
      },
      LatLngBounds: function (ne: string, sw: string) {
        return {
          getSouthWest: function () {
            return sw;
          },
          getNorthEast: function () {
            return ne;
          },
        };
      },
    },
  };
};

Object.defineProperty(window, 'google', { value: mockGoogle() });
