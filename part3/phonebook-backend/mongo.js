const mongo = require('mongoose');

if(process.argv.length < 4) {
    console.log('Please provide the username and password as an argument: node mongo.js <username> <password>');
    process.exit(1);
}

const uname = process.argv[2];
const pass = process.argv[3];
const url = `mongodb+srv://${uname}:${pass}@cluster0.twy8y.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    useFindAndModify: false,
    useCreateIndex: true
});

const phoneSchema = new mongo.Schema({
    name: String,
    number: String,
    date: Date
});

const Phone = mongo.model('Phone', phoneSchema);

if(process.argv.length === 6) {
    const phone = new Phone({
        name: process.argv[4],
        number: process.argv[5]
    });

    phone.save().then(res => {
        console.log(`added ${res.name} number ${res.number} to phonebook`);
        mongo.connection.close();
    });
}

if(process.argv.length === 4) {
    Phone.find({}).then(res => {
        console.log('phonebook:');
        res.forEach(item => {
            console.log(`${item.name} ${item.number}`);
        });
        mongo.connection.close();
    });
}
