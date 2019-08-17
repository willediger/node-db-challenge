exports.seed = function(knex) {
  return knex("resources").insert([
    {
      name: "room 101"
    },
    {
      name: "room 201",
      description: "best room"
    },
    {
      name: "room 102",
      description: "worst room"
    }
  ]);
};
