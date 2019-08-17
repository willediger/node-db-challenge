exports.seed = function(knex) {
  return knex("projects").insert([
    {
      name: "set up seeds",
      completed: 1
    },
    {
      name: "setup api",
      completed: 0
    },
    {
      name: "make up projects",
      completed: 0
    }
  ]);
};
