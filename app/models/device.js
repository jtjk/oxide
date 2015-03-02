import DS from 'ember-data';

var Device = DS.Model.extend({

    deviceType: function () {
        var dt = 'defaultdevice',
            tags = this.get('tags'),
            tag = null,
            tsplit = null;
        for (tag in tags) {
            if (tags.hasOwnProperty(tag)) {
                console.log('T: ' + tag + ' V: ' + tags[tag]);
                tsplit = tags[tag].split(':');
                if (tsplit[0] === 'type') {
                    dt = tsplit[1];
                }
            }
        }
        return dt;
    }.property('tags'),

    nitrogen_id: DS.attr('string'),
    name: DS.attr('string'),
    status: DS.attr('boolean', {defaultValue: false}),
    lastUpdated: DS.attr('number'),
    last_connection: DS.attr('string'),
    last_ip: DS.attr('string'),
    nickname: DS.attr('string'),
    created_at: DS.attr('string'),
    updated_at: DS.attr('string'),
    tags: DS.attr(),
    type: DS.attr(),
    location: DS.attr(),

    // Relations
    owner: DS.belongsTo('user', {async: true})
});

export default Device;
