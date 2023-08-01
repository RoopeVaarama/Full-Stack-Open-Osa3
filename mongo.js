const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@full-stack-open-osa3.5hgl25i.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const PhoneBook = mongoose.model('Phonebook', phoneSchema);

const name = process.argv[3];
const number = process.argv[4];
console.log(name, number);
if (name && number) {
    const phone = new PhoneBook({
        name: name,
        number: number,
    });

    phone.save().then((result) => {
        console.log(result);
        console.log('added ' + name + ' number ' + number + ' to phonebook');
        mongoose.connection.close();
    });
} else {
    PhoneBook.find({}).then((result) => {
        console.log('phonebook:');
        result.forEach((phone) => {
            console.log(phone.name + ' ' + phone.number);
        });
        mongoose.connection.close();
    });
}
