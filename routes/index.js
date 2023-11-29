var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./post')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/allposts', async function (req, res, next){
  let user = await userModel.findOne({_id: "656757bd9b7368c72a258114"}).populate('posts');
  res.send(user);
}); 

router.get('/createuser', async function (req, res, next){
let createdUser = await  userModel.create({
username: "Rishabh",
password: "test",
posts: [],
email: "test@mail.com",
fullName: "Rishabh Pal Singh",
  })
  res.send(createdUser);
} )

router.get('/createpost', async function (req, res, next){
  let createdpost = await  postModel.create({
  postText: "Second test post",
  user: "656757bd9b7368c72a258114"
    });
    let user = await userModel.findOne({_id: "656757bd9b7368c72a258114"});
    user.posts.push(createdpost._id);
    await user.save();
    res.send("Post created");
  } )

module.exports = router;
