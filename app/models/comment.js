import DS from 'ember-data';

export default DS.Model.extend({
  album: DS.belongsTo('album'),
  author: DS.attr(),
  message: DS.attr()
});
