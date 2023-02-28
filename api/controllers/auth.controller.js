import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
	try {
		const hash = bcrypt.hashSync(req.body.password, 5);
		const newUser = new User({ ...req.body, password: hash });
		await newUser.save();
		res.status(200).send('User has been created.');
	} catch (error) {
		res.status(500).send('Something went wrong!');
	}
};

export const login = async (req, res) => {
	try {
		// user inputted username and password.
		const { username, password } = req.body;

		// retrieve specific user by `username` from remote db.
		const user = await User.findOne({ username });
		if (!user) return res.status(404).send('User not found!');

		// if user existed, compare inputted pwd and hashed pwd in remote db.
		const isCorrect = bcrypt.compareSync(password, user.password);
		if (!isCorrect) return res.status(400).send('Wrong username or password!');

		// Create token with user's _id.
		const token = jwt.sign({
			id: user._id,
		}, process.env.JWT_KEY)

		// return user info except pwd.
		const { password: pwd, ...info } = user._doc;

		// set the token created above to cookie.
		res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
	} catch (error) {
		console.log(error);
		res.status(500).send('Something went wrong!');
	}
};

export const logout = async (req, res) => { };
