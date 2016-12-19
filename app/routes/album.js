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
      comment.destroyRecord();
    },
    add_comment(model) {
      console.log("In action")
      console.log(this.controller.get('author'))
      console.log(this.controller.get('message'))
      console.log(model)
      console.log(model.name)
      let comment = this.store.createRecord('comment', {
        author: this.controller.get('author'),
        message: this.controller.get('message'),
        album: model
      });
      console.log("comment object")
      console.log(comment.get('album'))
      console.log(comment.save())
      comment.save()
    },
  }
});
