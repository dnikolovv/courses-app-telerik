var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    name: { type: String, require: '{PATH} is required.'},
    featured: { type: Boolean, require: '{PATH} is required.'},
    published: { type: Date, require: '{PATH} is required.'},
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

module.exports.seedInitialCourses = function () {

    Course.find({}).exec(function (err, courses) {

        if (err) {
            console.log("Couldn't query courses: " + err);
            return;
        }

        if (courses.length === 0) {

            Course.create({name: 'C#', featured: true, published: new Date('10/5/2011'), tags: ['C#']});
            Course.create({name: 'Java', featured: true, published: new Date('10/5/2018'), tags: ['Java']});
            Course.create({name: 'C++', featured: true, published: new Date('10/5/2016'), tags: ['C++']});
            Course.create({name: 'Ruby on rails', featured: true, published: new Date('10/5/2013'), tags: ['Ruby on rails']});
            Course.create({name: 'Javascript', featured: true, published: new Date('10/5/2012'), tags: ['Javascript']});
        }

        console.log('Added courses to database');
    });
};