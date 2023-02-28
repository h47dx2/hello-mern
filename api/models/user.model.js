import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
}, {
  //schema options, @https://mongoosejs.com/docs/guide.html#timestamps
  timestamps: true,
})

export default mongoose.model('User', userSchema);