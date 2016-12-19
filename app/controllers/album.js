import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'sort_on',
    'sort_direction',
    'per_page',
    'page'
  ],
  sort_on: 'updated_at',
  sort_direction: 'desc',
  author: '',
  message: '',
});
