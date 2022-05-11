require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const messages = require("../utils/messages.util");


const userRegister = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length >= 1) {
        if (!user.verified) {
          res.status(409).json({ message: messages.USER_EMAIL_EXIST })
        }
        res.status(409).json({ message: messages.USER_EMAIL_EXIST })
			} else {
        bcrypt.genSalt(10, (_, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({ error: err })
            } else {
              const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                friend: req.body.friend,
                // phone: req.body.phone,
                password: hash,
              })
              
              newUser
                .save()
                .then(async (result) => {
                  await result
                    .save()
                    .then(() => {
                        console.log(`User created ${result}`)
                        res.status(201).json({
                          message: messages.USER_CREATED_ACCOUNT,
                          userDetails: {
                            userId: result._id,
                            email: result.email,
                            name: result.name,
                          },
                        })
                    })
                    .catch((err) => {
                      console.log(err)
                      res.status(400).json({
                        message: err.toString()
                      })
                    })
                })
                .catch((err) => {
                  console.log(err)
                  res.status(500).json({
                    message: err.toString()
                  })
                })
            }
          });
        })
			}
		})
		.catch((err) => {
      console.log(err)
      res.status(500).json({
        message: err.toString()
      })
    });
}

const userLogin = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
      console.log(user)
			if (user.length < 1) {
				return res.status(401).json({
					message: messages.USER_EMAIL_NOT_EXIST,
				});
			}
      if (!user[0].verified) {
        return res.status(401).json({
					message: messages.USER_NOT_VERIFIED,
				});
      }
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
          console.log(err)
					return res.status(401).json({
						message: messages.USER_LOGIN_FAILURE,
					});
				}
				if (result) {
					const token = jwt.sign(
						{
              userId: user[0]._id,
							email: user[0].email,
							name: user[0].name,
              registered_at: user[0].registered_at
							// phone_number: user[0].phone_number,
						},
						process.env.JWT_SECRET_KEY,
						{
							expiresIn: "1d",
						}
          );
          console.log(user[0])

					return res.status(200).json({
						message: messages.USER_LOGIN_SUCCESS,
						userDetails: {
							userId: user[0]._id,
							name: user[0].name,
							email: user[0].email,
						},
						token: token,
					});
				}
				res.status(401).json({
					message: messages.USER_INVALID_PASSWORD,
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
}

const getMe = async (req, res) => {
	const userId = req.user.userId;
	const user = await User.findById(userId);
	if (user) {
		res.status(200).json({
			message: messages.USER_FOUND_PROFILE,
			user,
		});
	} else {
		res.status(400).json({
			message: messages.BAD_REQUEST,
		});
	}
};

const userVerify = async (req, res) => {
  if (req.user.verified) {
    return res.status(400).json({
			message: messages.USER_ALREADY_VERIFIED,
		});
  }

  const userId = req.user.userId;
	const user = await User.findById(userId);

	if (user) {
    user.verified = true;
    user.verified_at = Date.now();

    user
      .save()
      .then(async (result) => {
        await result
          .save()
          .then(() => {
              console.log(`User changed ${result}`)
              res.status(200).json({
                message: messages.USER_VERIFIED_SUCCESS,
                userDetails: {
                  userId: result._id,
                  email: result.email,
                  name: result.name,
                },
              })
          })
          .catch((err) => {
            console.log(err)
            res.status(400).json({
              message: err.toString()
            })
          })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: err.toString()
        })
      })
	} else {
		res.status(400).json({
			message: messages.BAD_REQUEST,
		});
	}
}

module.exports = {
  userRegister,
  userLogin,
	getMe,
  userVerify,
};
