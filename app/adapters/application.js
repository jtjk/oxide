import App from '../app';
import DS from 'ember-data';
import Config from '../config/environment';

function singularize(key) {
  // remove the trailing `s`. You might want to store a hash of
  // plural->singular if you deal with names that don't follow
  // this pattern
  return key.substr(0, key.length - 1);
}

App.ApplicationSerializer = DS.RESTSerializer.extend({
  extractHasMany: function(type, hash, key) {
    return hash[key][singularize(key)].id;
  }
});

// Rest Adapter, calling http://[HOST]/api/model/id
// -------------------------------------------------
export default DS.RESTAdapter.extend({
    namespace: 'api/v1',
    host: null,
    headers: {
      'Authorization': 'secret key'
    },
    ajax: function(url, type, hash) {
        var headers = this.get('headers');
        var appController = this.container.lookup('controller:application');
        var session = appController.get('nitrogenSession');
        headers.Authorization = 'Bearer ' + session.accessToken.token;
        return this._super(url, type, hash);
    },
    buildURL: function(type, id, snapshot) {
        console.log(type,id,snapshot);
        var host = this.get('host');
        if (host == null) 
        {
            var protocol = Config.APP.nitrogen.protocol;
            var hostdns = Config.APP.nitrogen.host;
            var port = Config.APP.nitrogen.http_port;
            host = protocol + '://' + hostdns + ':' + port;
            this.set('host', host);
        }
        return host + '/' + this.get('namespace') + '/' + type + 's';
    }
});

