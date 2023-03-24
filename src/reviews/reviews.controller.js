const reviewsService = require("./reviews.service")

async function reviewExists(req, res, next){
    const review = await reviewsService.read(req.params.reviewId);
    if (review){
        res.locals.review = review;
       return next();
    }
    next({ status: 404, message: `Review cannot be found` });
}

async function update(req, res, next) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    const data = await reviewsService.update(updatedReview)
      res.json({ data })
  }

async function destroy(req, res) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
  }

async function list(req, res, next){
    const {movieId} = req.params;
    console.log("params", req.params)
    const data = await reviewsService.list(movieId);
    // console.log("data", data)
    res.json({data}) 
}

module.exports= {
    update:[reviewExists, update],
    delete:[reviewExists, destroy],
    list,
};

