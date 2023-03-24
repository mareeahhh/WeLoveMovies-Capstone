const knex = require("../db/connection");

//returns movies that are still showing
function moviesShowing(is_showing){
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": is_showing })
    .distinct();
}

//GET /movies
function list(is_showing) {
  if (is_showing){
    return moviesShowing(Boolean(is_showing));
  }
  return knex("movies").select("*");
}

function read(movie_id){
  return knex("movies").select("*").where({ movie_id: movie_id }).first()
}


module.exports = {
  list,
  read,
};