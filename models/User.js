const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String, 
            required: 'You need to provide a username!',
            trim: true,
            //unique
        },
        email: {
            type: String, 
            required: 'You need to provide an email address!', 
            //unique, 
            //must match valid email
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
        (total, friend) => total + friends.length + 1,
        0
    );
});

const User = model('User', UserSchema);

module.exports = User; 