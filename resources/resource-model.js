const db = require("../data/dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("resources");

    if (id) {
      return query.where("id", id).first();
    }
    return query;
  },

  insert: function(resource) {
    return db("resources")
      .insert(resource)
      .then(([id]) => this.get(id));
  }
};
