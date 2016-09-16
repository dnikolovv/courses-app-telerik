var Course = require('mongoose').model('Course');

module.exports = {

    getAllCourses: function(req, res) {
        Course.find({}).exec(function (err, courses) {
            if (err) {
                console.log("Couldn't obtain courses: " + err);
            }

            res.send(courses);
        })
    }
}