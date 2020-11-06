const mongo = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(resp => console.log('connected to MongoDB'))
.catch(err => console.log('error connecting to MongoDB:', err.message));

const phoneSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },
    date: Date
});

phoneSchema.plugin(uniqueValidator);

phoneSchema.set('toJSON', {
    transform: (doc, returnObj) => {
        returnObj.id = String(doc._id);
        delete returnObj._id;
        delete returnObj.__v;
    }
});

module.exports = mongo.model('Phone', phoneSchema);
