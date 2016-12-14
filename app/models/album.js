import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  updated_at: DS.attr('date'),

  comment_ids: DS.hasMany('comment'),
  artist_id: DS.belongsTo('artist')
});
