const { Schema, model } = require('mongoose');

//validate email 
var validateEmail = function(email) {
    var re = `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$`,
    return re.test(email)
};


const UserSchema = new Schema(
    {
        username: {
            type: String, 
            required: 'You need to provide a username!',
            trim: true,
            unique: true
        },
        email: {
            type: String, 
            trim: true, 
            required: 'You need to provide an email address!', 
            unique: true,
            //must match valid email
            validate: [validateEmail, 'Please enter a valid email address.'],
            match: [`/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/`, 'Please fill a valid email address']
            
        },
        //array of _id values referencing Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        //array of _id values referencing the User model
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true
        },
        //prevents virtuals from creating duplicate of _id as 'id'
        id: false
    }
);

//get total friend count of User 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
        (total, friends) => total + friends.length + 1,
        0
    );
});

const User = model('User', UserSchema);

module.exports = User; 