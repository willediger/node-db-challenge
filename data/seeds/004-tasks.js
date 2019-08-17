exports.seed = function(knex) {
  return knex("tasks").insert([
    {
      project_id: 1,
      description: "description of task 1",
      notes: "completely optional notes",
      completed: 1
    },
    {
      project_id: 1,
      description: "description of task 2",
      completed: 0
    },
    {
      project_id: 1,
      description: "description of task 3",
      completed: 0
    },
    {
      project_id: 2,
      description: "description of task 1",
      notes: "completely optional",
      completed: 0
    },
    {
      project_id: 2,
      description: "description of task 2",
      completed: 0
    },

    {
      project_id: 3,
      description: "description of task 1",
      completed: 0
    }
  ]);
};
