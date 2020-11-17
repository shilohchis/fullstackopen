const mongo = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongo.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: false,
    useFindAndModify: false
})
    .then(res => console.log('connected to MongoDB'))
    .catch(err => console.log('error connecting to MongoDB:', err.message));

const noteSchema = mongo.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (doc, returnObj) => {
        returnObj.id = String(doc._id);
        delete returnObj.__v;
        delete returnObj._id;
    }
});

module.exports = mongo.model('Note', noteSchema);
