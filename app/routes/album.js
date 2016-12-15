import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('album', params.album_id);
  },
  queryParams: {
    sort_on: {
      refreshModel: true
    },
    sort_direction: {
      refreshModel: true
    },
    per_page: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  }
});
