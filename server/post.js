const express = require('express');
const router = express.Router();
const app = express();

const sql = require("./db.js");

router.get('/', async function (req, res) {
	try {
		const data = await sql.query("SELECT * from posts");
		res.send({data});
	} catch(err){
		console.log(err);
		res.send({err});
	}
})

router.get('/:id', async function (req, res) {
	console.log(`ID: ${req.params.id}`);
	const id = parseInt(req.params.id);

	try{
		const data = await sql.query("SELECT * from posts where id = ?", id);
		res.send({data});
	} catch(err) {
		console.log(JSON.stringify(err));
		res.send(err);
	}
})

router.post('/', async function (req, res) {
	try{
		const data = await sql.query("INSERT INTO posts (user_id, title, published) values (1, ?, 1)", req.body.title);
		res.send({data});
	} catch(err) {
		console.log(JSON.stringify(err));
		res.send(err);
	}
})

router.put('/:id', function (req, res) {
	console.log(`ID: ${req.params.id}`);
	const id = parseInt(req.params.id);
	const post = posts.find(it => it.id === id);
	if(post){
		post.title=req.body.title;
	}
	res.send({post});
})

router.put('/:user_id/posts', async function (req, res) {
	console.log(`USER_ID: ${req.params.user_id}`);
	const user_id = parseInt(req.params.user_id);

	try {
		const data = await sql.query("SELECT * from posts where user_id=?", user_id);
		res.send({data});
	} catch(err){
		res.send({err});
	}

})

module.exports = router;
