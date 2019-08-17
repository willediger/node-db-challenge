const db = require("../data/dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("projects");

    if (id) {
      return query.where("id", id).first();
    }
    return query;
  },

  insert: function(project) {
    return db("projects")
      .insert(project)
      .then(([id]) => this.get(id));
  }
};
