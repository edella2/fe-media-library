import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({

    artists: this.store.query('artist', {
      sort_on: 'name',
      sort_direction: 'desc',
      reload: true
    }),
    // using descending sort
    top_five_artists: this.store.findAll('artist', { reload: true }).
      then(artist => artist.sortBy('total_albums_sold').reverse().slice(0,5))
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
  },
});
