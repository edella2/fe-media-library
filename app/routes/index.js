import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('artist', {
      sort_on: 'name',
      sort_direction: 'desc',
    });
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
