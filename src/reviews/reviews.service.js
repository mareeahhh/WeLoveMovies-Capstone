const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function readCritic(critic_id){
  return knex("critics").select("*").where({critic_id}).first();
}

async function setCritic(review){
  review.critic = await readCritic(review.critic_id);
  return review;
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update({ score: updatedReview.score, content: updatedReview.content})
    .then(()=> read(updatedReview.review_id))
    .then(setCritic)
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

// join the reviews & critics table 
function list(movieId){
  // console.log("movieId", movieId)
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where( "r.movie_id", movieId)
        .then((data)=> {
          // console.log("addCritic", data[0])
          return data.map(addCritic)
          // return addCritic(data)
        })
        // .then((data)=> console.log(data))
}

  module.exports = {
    read,
    update,
    delete:destroy,
    list,
 };