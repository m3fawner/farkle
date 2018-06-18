if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require.ensure('promise/lib/rejection-tracking', (require) => {
    require('promise/lib/rejection-tracking').enable();
  });
  require.ensure('promise/lib/es6-extensions', (require) => {
    window.Promise = require('promise/lib/es6-extensions');
  });
}

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
const values = require('object.values');

if (!Object.values) {
  values.shim();
}
