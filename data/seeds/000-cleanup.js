exports.seed = async function(knex) {
  try {
    await knex.truncate("tasks");
    await knex.truncate("project_resources");
    await knex.truncate("projects");
    await knex.truncate("resources");
  } catch (err) {
    console.log(err);
  }
};
