const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')



const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    name: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    verifyEmailToken: String,
    verifyEmailTokenExpiry: Date,
    isVerified: { type: Boolean, default: false }
    
});

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);