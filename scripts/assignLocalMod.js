const mongoose = require('mongoose');
const Account = require('../models/account');
const successfulAdmins = [];

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/secret-hitler-app`);

Account.find({ username: { $in: ['Marco'] } })
	.cursor()
	.eachAsync(acc => {
		acc.staffRole = '';
		acc.save();
		successfulAdmins.push(acc.username);
	})
	.then(() => {
		console.log('Users', successfulAdmins, 'were assigned the admin role.');
		mongoose.connection.close();
	});
