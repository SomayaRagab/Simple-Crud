import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      validate: {
        validator: function (v: string) {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(v);
        },
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: 'Role is either: user , manager or admin',
      },
      default: 'user',
      selected: false,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Please provide a password'],
      // validate password length 8 characters and at least 1 number and 1 special character and 1 uppercase letter and 1 lowercase letter
      validate: {
        validator: function (v: string) {
          const passwordRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
          return passwordRegex.test(v);
        },
        message: (props: any) =>
          `Password must be at least 8 characters long and contain at least 1 number, 1 special character, 1 uppercase letter and 1 lowercase letter`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Define methods on the user schema
// userSchema.methods.correctPassword = async function (
//   candidatePassword: string,
//   userPassword: string
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  const user: any = this;
  if (!user.isModified('password')) return next();
  user.password = await bcrypt.hash(user.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
