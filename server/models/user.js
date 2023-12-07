const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    name: {type: String, require: true},
    role: {type: String, default: 'USER'},
    courses: String,
    ratings: [String],
    grades: [String],
    selectedCourses: [String],
    // photo: {type: String, default: '/nav/user-photo.jpeg'},
    // bio: String,
    // games: {type: [String]}

})

module.exports = model('User', User);

