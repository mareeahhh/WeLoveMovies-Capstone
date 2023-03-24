const moviesService = require("./movies.service");

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId)
      if (movie) {
        res.locals.movie = movie;
        next();
      }
      next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res) {
  const data = await moviesService.list(req.query.is_showing);
  res.json({ data });
  // console.log("data", data)
}

function read(req, res, next){
   const {movie: data}  = res.locals;
  //  console.log("locals", res.locals)
  res.json({data}); 
}

module.exports = {
  read:[
    movieExists,
    read,
  ],
  list,
};