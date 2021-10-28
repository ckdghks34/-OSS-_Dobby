var express = require('express');
var router = express.Router();

var database = require("./../firebase/fbconfig.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async  function(req,res,next){
	const docRef = database.collection("users");

	const data = {
//		id : req.body["id"],
		id : req.body["id"],
		password : req.body["password"],
		name : req.body["name"],
		nickname : req.body["nickname"],
		phone : req.body["phone"],
		address : req.body["address"],
		email : req.body["email"]
	}

	await docRef.add(data);
	return res.json({
		state : 201});
});

router.post('/gettest', async function(req,res,next){

	console.log(req.body["id"]);
	const docRef = database.collection("users");
	const snapshot = await docRef.where("id","==",req.body["id"]).get();
	
	if(snapshot.empty){
		return res.json({
			msg : "no data"
		});
	}
	else{
		var redata = [];
		snapshot.forEach((doc) => {
			data = doc.data();
			redata.push({
				id : doc.id,
				data : doc.data()
			});
		});
		console.log(redata);
		return res.json(redata);
	}		
});


module.exports = router;
