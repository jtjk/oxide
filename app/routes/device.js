import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        var querystr = '{"_id": "' + params._id + '"}';
        return this.store.find('principal', {q: querystr});
    }
});
