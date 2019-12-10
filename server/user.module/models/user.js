var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({

    firstname: {
        type: String,
        required: [true, 'Firstname is required']
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid e-mail address']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: [
            function(password) {
                return password && password.length >= 5;
            }, 'Password should be longer'
        ]
    },
    salt: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    phone: String,
    avatar: {
        type: String,
        default: 'no_avatar.jpg'
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    created: {
        type: Date,
        default: Date.now
    }
});


UserSchema.virtual('fullname').get(function() {
    return this.firstname + ' ' + this.lastname;
}).set(function(fullname) {
    var splitName = fullname.split(' ');
    this.firstname = splitName[0] || '';
    this.lastname = splitName[1] || '';
});

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);