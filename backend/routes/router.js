// Express
const express = require('express');

// Router
const router = express.Router();

// GET Controller
const getAdmin = require('../controller/getController/getAdmin');
const getUser = require('../controller/getController/getUser');

// POST Controller
const adminController = require('../controller/postController/admin');
const userController = require('../controller/postController/user');

// Autherization
const adminAuth = require('../authentication/adminAuth');
const userAuth = require('../authentication/userAuth');

// User Utility
const userUtilityViewProfile = require('../user-utility/view-profile');
const userUtilityEditProfile = require('../user-utility/edit-profile');
const userUtilityUpdatePassword = require('../user-utility/change-password');
const userViewIssuedBooks = require('../user-utility/user-view-issued-books');

// Admin Utility
const adminUtilityViewProfile = require('../admin-utility/view-profile');
const adminUtilityEditProfile = require('../admin-utility/edit-profile');
const adminUtilityUpdatePassword = require('../admin-utility/change-password');

// Admin Dashboard
const adminViewRegisteredUser = require('../admin-utility/admin-dashboard/admin-view-registered-user');
const adminViewRegisteredBooks = require('../admin-utility/admin-dashboard/admin-registered-books');
const adminViewRegisteredCategory = require('../admin-utility/admin-dashboard/admin-registered-category');
const adminViewRegisteredAuthor = require('../admin-utility/admin-dashboard/admin-registered-author');
const adminIssueBook = require('../admin-utility/admin-dashboard/issue-book');
const adminManageBook = require('../admin-utility/admin-dashboard/admin-manage-book');
const adminManageCategory = require('../admin-utility/admin-dashboard/admin-manage-category');
const adminManageAuthor = require('../admin-utility/admin-dashboard/admin-manage-author');

// GET Request's
router.get('/', getUser.getHome);                     // Home Page
router.get('/register', getUser.getRegister);         // Register Page
router.get('/adminLogin', adminAuth, getAdmin.getAdminLogin);    // Admin Login Page
router.get('/userLogin', userAuth, getUser.getUserLogin);       // Login Page


// POST Request's 
router.post('/adminLogin', adminController.adminLogin);  // Admin Login
router.post('/register', userController.register);       // Register
router.post('/userLogin', userController.userLogin);     // User Login

// Autherization
router.get('/admin-dashboard', adminAuth, adminController.adminAuth);  // Admin 
router.get('/user-dashboard', userAuth, userController.userAuth);      // User 

// Logout
router.get('/adminLogout', adminAuth, adminController.adminLogout);  // Admin
router.get('/userLogout', userAuth, userController.userLogout);      // User

/* User Utility */
// View Profile
router.get('/user-view-profile', userAuth, userUtilityViewProfile.viewProfile); // User

// Update Profile
router.get('/user-edit-profile', userAuth, userUtilityEditProfile.editProfile);  // User
router.post('/user-update-profile', userAuth, userUtilityEditProfile.updateProfile);  // User

// Update Password
router.get('/user-change-password', userAuth, userUtilityUpdatePassword.updatePassword); // User
router.post('/user-update-password', userAuth, userUtilityUpdatePassword.changePassword); // User


/* Admin Utility */
// View Profile
router.get('/admin-view-profile', adminAuth, adminUtilityViewProfile.viewProfile);

// Update Profile
router.get('/admin-edit-profile', adminAuth, adminUtilityEditProfile.editProfile);
router.post('/admin-update-profile', adminAuth, adminUtilityEditProfile.updateProfile);

// Update Password
router.get('/admin-change-password', adminAuth, adminUtilityUpdatePassword.updatePassword);
router.post('/adminUpdatePassword', adminAuth, adminUtilityUpdatePassword.changePassword);

/* Admin Dashboard */
router.get('/admin-view-registered-user', adminAuth, adminViewRegisteredUser.adminViewRegisteredUser);

// Registered, Add New & Manage Books
router.get('/admin-view-registered-books', adminAuth, adminViewRegisteredBooks.adminViewRegisteredBooks);
router.get('/add-new-book', adminAuth, adminViewRegisteredBooks.addNewBook);
router.post('/add-new-book', adminAuth, adminViewRegisteredBooks.postAddNewBook);
router.get('/manage-book', adminAuth, adminManageBook.getAdminManageBook);

// Edit Book
router.get('/edit-book', adminAuth, adminManageBook.getAdminEditBook);
router.post('/edit-book', adminAuth, adminManageBook.postAdminEditBook);

// Delete Book
router.get('/delete-book', adminAuth, adminManageBook.getAdminDeleteBook);


// Registered Category & Add New Category
router.get('/admin-view-registered-category', adminAuth, adminViewRegisteredCategory.adminViewRegisteredCategory);
router.get('/add-new-category', adminAuth, adminViewRegisteredCategory.addNewCategory);
router.post('/add-new-category', adminAuth, adminViewRegisteredCategory.postAddNewCategory);
router.get('/manage-category', adminAuth, adminManageCategory.getAdminManageCategory);

// Edit Category
router.get('/edit-category', adminAuth, adminManageCategory.getAdminEditCategory);
router.post('/edit-category', adminAuth, adminManageCategory.postAdminEditCategory);

// // Delete Category
router.get('/delete-category', adminAuth, adminManageCategory.getAdminDeleteCategory);

// Registered Author & Add New Author
router.get('/admin-view-registered-author', adminAuth, adminViewRegisteredAuthor.adminViewRegisteredAuthor);
router.get('/add-new-author', adminAuth, adminViewRegisteredAuthor.addNewAuthor);
router.post('/add-new-author', adminAuth, adminViewRegisteredAuthor.postAddNewAuthor);
router.get('/manage-author', adminAuth, adminManageAuthor.getAdminManageAuthor);

// Edit Author
router.get('/edit-author', adminAuth, adminManageAuthor.getAdminEditAuthor);
router.post('/edit-author', adminAuth, adminManageAuthor.postAdminEditAuthor);

// Delete Author
router.get('/delete-author', adminAuth, adminManageAuthor.getAdminDeleteAuthor);

// Admin Issue Book 
router.get('/issue-book', adminAuth, adminIssueBook.issueBook);
router.post('/issue-book', adminAuth, adminIssueBook.postIssueBook);
router.get('/admin-view-issued-book', adminAuth, adminIssueBook.adminViewIssuedBook);

// User Issued Books
router.get('/user-view-issued-books', userAuth, userViewIssuedBooks.getUserViewIssuedBooks);


// Invalid Route    
router.get('**', (req, res) => {
    res.redirect('/');
})

// Router Module Exporting 
module.exports = router; 