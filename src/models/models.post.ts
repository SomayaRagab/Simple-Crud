import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Post must belong to a user'],
    },
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
