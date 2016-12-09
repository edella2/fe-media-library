import DS from 'ember-data';

export default DS.Model.extend({
  album: DS.hasMany('album'),
  name: DS.attr(),
  based_in: DS.attr(),
  founding_year: DS.attr()
});
