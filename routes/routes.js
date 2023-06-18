const express=require('express');
const router=express.Router();
const {userLogin,registerUser,getAllUsers,getUserById,updateUser,getFavBooks,addToFav,deleteUser}=require('../controllers/userController');
const {addBook,getAllBooks,getBookById,updateBook,deleteBook}=require('../controllers/bookController');
const jwtAuthorization = require('../middlewares/jwtMiddleware');
//user routes
router.get('/getAllUsers',jwtAuthorization.verifyToken,getAllUsers);
router.get('/getSingleUser/:id',jwtAuthorization.verifyToken,getUserById);
router.route('/registerUser').post(registerUser);
router.put('/updateUser',jwtAuthorization.verifyToken,updateUser);
router.post('/login',userLogin);
router.get('/favBooks',jwtAuthorization.verifyToken,getFavBooks);
router.put('/addFavBooks',jwtAuthorization.verifyToken,addToFav);
router.post('/deleteUser',jwtAuthorization.verifyToken,deleteUser);

//books routes
router.get('/getAllBooks',jwtAuthorization.verifyToken,getAllBooks);
router.route('/addBook').post(addBook);
router.get('/getSingleBook/:id',jwtAuthorization.verifyToken,getBookById);
router.put('/updateBook',jwtAuthorization.verifyToken,updateBook);
router.post('/deleteBook',jwtAuthorization.verifyToken,deleteBook);



module.exports=router;

