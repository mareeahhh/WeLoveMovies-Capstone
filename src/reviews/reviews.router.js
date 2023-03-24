const router = require("express").Router({mergeParams:true});
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:reviewId([0-9]+)").put(controller.update).delete(controller.delete).all(methodNotAllowed)


module.exports = router;

//when fwding params from 1 router to another make sure to merge params
//.delete(controller.delete)