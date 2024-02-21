const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    picture: {
        type: String,
    },
    video: {
        type: String,
    },
    usersLiked: {
        type: [String],
        required: true,
    },
    totalLikes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: [
            {
                userId: String,
                username: String,
                text: String,
                timestamp: Number
            }
        ],
        required: true,
    }
}, { timestamps: true });

/**
 * Increments total likes
 * @param {ObjectId} _id - The id of the post to be incremented
 * @returns {Promise<boolean>}
 */
postSchema.statics.incrementTotalLikes = async function (_id, like) {
  const post = await this.findOne({ _id });

  if (post) {
    post.totalLikes = like ? post.totalLikes + 1 : post.totalLikes - 1;
    await post.updateOne(post);
  }
};

postSchema.statics.updateTotalLikes = async function (userId) {
  const post = await this.findOne({ userId });

  if (post) {
    post.totalLikes = post.usersLiked.length;
    await post.updateOne(post);
  }
};

module.exports = mongoose.model('Post', postSchema);
