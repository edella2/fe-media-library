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
  },

  actions: {
    delete_comment(comment) {
      this.controller.get('model.comment_ids').removeObject(comment);
      comment.destroyRecord();
      this.controller.get('model').save();
    },
    add_comment(model) {

      let comment = this.store.createRecord('comment', {
        author: this.controller.get('author'),
        message: this.controller.get('message'),
        album: model
      });

      comment.save().then((comment) => {
        model.get('comment_ids').addObject(comment);
        model.save();
      });
    },
  }
});
