import Ember from 'ember';
import { ActiveModelSerializer } from 'active-model-adapter';

const inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

export default ActiveModelSerializer.extend({
  serializeIntoHash(hash, typeClass, snapshot, options) {
    let _this = this;
    let normalizedRootKey = this.payloadKeyFromModelName(typeClass.modelName);
    let record = snapshot.record;

    hash[normalizedRootKey] = this.serialize(snapshot, options);

    if (snapshot.id) {
      hash[normalizedRootKey].id = snapshot.id;
    }

    Object.keys(hash[normalizedRootKey]).forEach((key) => {
      if (key === 'id' || /_id$/.test(key)) {
        if (typeof hash[normalizedRootKey][key] === 'string') {
          hash[normalizedRootKey][key] = Number.parseInt(hash[normalizedRootKey][key]);
        }
      }

      // remove extra _id from related object(ex. album_id_id)
      if (/_id_id$/.test(key)) {
        let new_key = key.substring(0, key.length - 3)
        hash[normalizedRootKey][new_key] = hash[normalizedRootKey][key]
        delete hash[normalizedRootKey][key]
      }
    });

    delete hash[normalizedRootKey].updated_at;
  }
});