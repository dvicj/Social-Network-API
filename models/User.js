const { Schema, model } = require('mongoose');

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
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
            
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

const User = model('User', UserSchema);

//get total friend count of User 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length; 
});



module.exports = User; 