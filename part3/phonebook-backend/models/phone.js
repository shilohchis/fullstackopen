const mongo = require('mongoose');

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
    name: String,
    number: String,
    date: Date
});

phoneSchema.set('toJSON', {
    transform: (doc, returnObj) => {
        returnObj.id = String(doc._id);
        delete returnObj._id;
        delete returnObj.__v;
    }
});

module.exports = mongo.model('Phone', phoneSchema);
