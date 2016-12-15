import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'sort_on',
    'sort_direction',
    'per_page',
    'page'
  ],
  sort_on: 'total_sold',
  sort_direction: 'desc',
});
