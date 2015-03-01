import Ember from 'ember';

export function debugWriter(input) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (input) {
    console.log('Value');
    console.log('====================');
    console.log(input);
  }
  return input;
}

export default Ember.Handlebars.makeBoundHelper(debugWriter);
