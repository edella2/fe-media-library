import DS from 'ember-data';

export default DS.Model.extend({
  author: DS.attr('string'),
  message: DS.attr('string'),
  updated_at: DS.attr('date'),

  album_id: DS.belongsTo('comment')
});
