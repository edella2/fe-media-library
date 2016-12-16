import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  based_in: DS.attr('string'),
  updated_at: DS.attr('date'),
  founding_year: DS.attr('number'),

  album_ids: DS.hasMany('album'),
  albums_sold: Ember.computed.mapBy('album_ids', 'total_sold'),
  total_albums_sold: Ember.computed.sum('albums_sold')

  // tweetsUnread: Ember.computed.mapBy('users', 'tweetsUnread'),
  // totalTweetsUnread: Ember.computed.sum('tweetsUnread')
});
