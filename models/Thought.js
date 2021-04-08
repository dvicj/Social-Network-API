const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        //set custom id
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types._ObjectId()
        },
        thoughText: {
            type: String, 
            required: true, 
            //must be between 1 and 280 characters 
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
            required: true
        }, 
        //array of nested documents created with the reactionSchema
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types._ObjectId()
        },
        reactionBody: {
            type: String, 
            required: true, 
            //280 char. maximum
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

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length; 
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 
