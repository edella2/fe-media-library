import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  based_in: DS.attr('string'),
  updated_at: DS.attr('date'),
  founding_year: DS.attr('number'),

  album_ids: DS.hasMany('album')
});
