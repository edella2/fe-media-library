import DS from 'ember-data';

export default DS.Model.extend({
  artist: DS.belongsTo('artist'),
  comment: DS.hasMany('comment'),
  name: DS.attr(),
  year: DS.attr(),
  total_sold: DS.attr()
});
