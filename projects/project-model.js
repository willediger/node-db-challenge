const db = require("../data/dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("projects");

    if (id) {
      return query.where("id", id).first();
    }
    return query;
  },
  getTask: function(id) {
    let query = db("tasks");

    if (id) {
      return query.where("id", id).first();
    }
    return query;
  },

  insert: function(project) {
    return db("projects")
      .insert(project)
      .then(([id]) => this.get(id));
  },

  insertTask: function(project_id, task) {
    const newTask = { project_id, ...task };
    return db("tasks")
      .insert(newTask)
      .then(([id]) => this.getTask(id));
  }
};
