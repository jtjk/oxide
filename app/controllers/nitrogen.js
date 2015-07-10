import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'application',
    appController: Ember.computed.alias('controllers.application'),
    subscribeToNitrogen: false,

    actions: {
        createNewDevice: function (options) {
            var appController = this.get('appController'),
                nitrogenService = appController.get('nitrogenService'),
                currentUsers = appController.get('currentUser'),
                apikey = currentUsers.content.get('api_key'),
                newDevice;

            if (apikey) {
                options = _.defaults(options, {
                    nickname: 'OxideDevice',
                    name: 'Oxide Device',
                    tags: ['oxide'],
                    api_key: apikey
                });

                newDevice = new nitrogen.Device(options);
                nitrogenService.connect(newDevice, function (err, session, principal) {
                    console.log(session, principal);
                });
            }
        },

        subscribeToNitrogen: function () {
            var appController = this.get('appController'),
                nitrogenSession = appController.get('nitrogenSession'),
                self = this;

            if (this.get('subscribedToNitrogen')) {
                return;
            }

            nitrogenSession.onMessage({
                $or: [{
                    type: 'location'
                }]
            }, function (message) {
                console.log('Message Received. New Location:', message.body);

                self.store.find('principal', {
                        id: message.from
                    })
                    .then(function (foundDevices) {
                        var foundDevice;

                        if (foundDevices && foundDevices.content && foundDevices.content.length > 0) {
                            foundDevice = foundDevices.content[0];
                            // TODO: Process incoming messages
                        }
                    });
            });

            this.set('subscribedToNitrogen', true);
        },

        getMessage: function (principalId, messageLimit) {
            var appController = this.get('appController'),
                nitrogenSession = appController.get('nitrogenSession'),
                limit = (messageLimit) ? messageLimit : 0,
                self = this;

            if (nitrogenSession && principalId) {
                nitrogen.Message.find(nitrogenSession, {
                        type: 'location',
                        from: principalId
                    }, {
                        sort: {
                            ts: -1
                        },
                        limit: limit
                    },
                    function (err, locations) {
                        if (err) {
                            return;
                        }

                        if (locations.length > 0) {
                            self.store.find('principal', {
                                id: principalId
                            }).then(function (foundDevices) {
                                var foundDevice;

                                if (foundDevices && foundDevices.content && foundDevices.content.length > 0) {
                                    foundDevice = foundDevices.content[0];

                                    // TODO: Process Messages
                                }
                            });
                        }
                    }
                );
            }
        }
    }

});
