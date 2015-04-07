
// runs a higher order trig function if in the whitelist,
// or throws an error
const whitelistedHOF = (hof, whitelist, blacklistMsg='Invalid function.') => (fn) => (deg) => {
  if (whitelist.indexOf(fn) === -1) {
    throw new Error(`${blacklistMsg} Valid values are: ${whitelist.join(', ')}.`);
  }
  return hof(fn, deg);
};

//the functions we want to run
const trigFn = (fn, deg) => Math[fn](deg * Math.PI / 180);
const invTrigFn = (fn, deg) => (180/Math.PI) * Math[fn](deg);

//apply the template to generate our functions
const Trigger = whitelistedHOF(trigFn,
  ['sin', 'cos', 'tan'],
  'Invalid trigonometric function.');
const InverseTrigger = whitelistedHOF(invTrigFn,
  ['asin', 'acos', 'atan'],
  'Invalid inverse trigonometric function.');

//export the implementations
//trig functions
export const sin = Trigger('sin');
export const cos = Trigger('cos');
export const tan = Trigger('tan');
//inverse trig functions
export const asin = InverseTrigger('asin');
export const acos = InverseTrigger('acos');
export const atan = InverseTrigger('atan');
