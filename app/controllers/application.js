import Ember from 'ember';

export default Ember.Controller.extend({

    locations: function () {
        return this.store.find('location');
    }.property(),

    principals: function () {
       return this.store.find('principal',{
           q: '{"type": "device"}'
       });
    }.property(),

    currentUser: function () {
        var appController = this.container.lookup('controller:application');
        var user = appController.get('user');
        return user;
    }.property(),
    
    avatarUrl: function() {
        var appController = this.container.lookup('controller:application');
        var user = appController.get('user');
		var email = user.email;
		var url = 'http://www.gravatar.com/avatar/' + md5(email) + '?s=200&r=pg';
		console.log(url);
		return url;
    }.property()
});
