const theatersService = require("./theaters.service")

async function list(req, res, next){
    const data = await theatersService.list();
    // console.log("data", data)
    res.json({ data }); 
}

module.exports= {
    list,
}


// /theaters -- 