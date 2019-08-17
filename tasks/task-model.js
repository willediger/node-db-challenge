const db = require("../data/dbConfig.js");

module.exports = {
  get: function(id) {
    let query = db("tasks as t")
      .join("projects as p", "t.project_id", "p.id")
      .select(
        "p.name as project_name",
        "p.description as project_description",
        "t.id",
        "t.description",
        "t.notes"
      );

    if (id) {
      return query.where("id", id).first();
    }
    return query;
  }
};
