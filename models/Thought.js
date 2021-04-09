const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment_id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types._ObjectId()
        },
        reactionBody: {
            type: String, 
            required: true, 
            trim: true, 
            //min. 1 character, max. 280 characters
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String, 
            required: true
        },
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughText: {
            type: String, 
            required: true, 
            //min. 1 character, max. 280 characters
            minLength: 1, 
            maxLength: 280
        },
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String, 
            required: true,
            ref: 'User'
        }, 
        //array of nested documents created with the reactionSchema
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false
    }
);


const Thought = model('Thought', ThoughtSchema);

//get total count of friends 
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length; 
});

module.exports = Thought; 
