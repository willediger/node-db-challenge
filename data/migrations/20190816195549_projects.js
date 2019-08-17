exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl
        .text("name")
        .notNullable()
        .unique()
        .notNullable();
      tbl.text("description");
      tbl.boolean("completed").notNullable();
    })

    .createTable("resources", tbl => {
      tbl.increments();
      tbl
        .text("name")
        .unique()
        .notNullable();
      tbl.text("description");
    })

    .createTable("project_resources", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.unique(["resource_id", "project_id"]);
    })

    .createTable("tasks", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("description").notNullable();
      tbl.text("notes");
      tbl.boolean("completed").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("projects")
    .dropTableIfExists("resources");
};
