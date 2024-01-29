const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const myNeighbourhoodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  posts: [
    {
      postText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
      },
      postAuthor: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      comments: [
        {
          commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true,
          },
          commentAuthor: {
            type: String,
            required: true,
            trim: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
          },
        },
      ],
    },
  ],
});

const MyNeighbourhood = model('MyNeighbourhood', myNeighbourhoodSchema);

module.exports = MyNeighbourhood;






// const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// const thoughtSchema = new Schema({
//   thoughtText: {
//     type: String,
//     required: 'You need to leave a thought!',
//     minlength: 1,
//     maxlength: 280,
//     trim: true,
//   },
//   thoughtAuthor: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     get: (timestamp) => dateFormat(timestamp),
//   },
//   comments: [
//     {
//       commentText: {
//         type: String,
//         required: true,
//         minlength: 1,
//         maxlength: 280,
//       },
//       commentAuthor: {
//         type: String,
//         required: true,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (timestamp) => dateFormat(timestamp),
//       },
//     },
//   ],
// });

// const Thought = model('Thought', thoughtSchema);

// module.exports = Thought;
