import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
    this.resource('dashboard', {path: '/'});

    this.resource('device', {path: 'device/:_id'});
    this.resource('user', {path: 'users/:user_id'});
    this.resource('location', {path: 'location/:location_id'});

    this.route('login');
    this.route('dashboard');
    this.route('settings');
});

export default Router;
