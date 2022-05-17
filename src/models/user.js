const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	_id:            mongoose.Schema.Types.ObjectId,
	id: 						{ type: String, default: '' },
	name:           { type: String, required: true },
	phone:          { type: String, default: '' },
	email:          { type: String, lowercase: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, required: true },
	password:       { type: String, required: true },
	invitationCode: { type: String, default: '' },
	friend:         { type: String, default: '' },
	fcm_token:      { type: String, default: '' },
	confirmed:      { type: Boolean, default: false },
	verified:       { type: Boolean, default: false },
	verified_at:    { type: Date, default: null },
	registered_at:  { type: Date, default: Date.now },
	old_passwords: 	{ type: Array, default: [] },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
