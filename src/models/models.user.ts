import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the interface for the User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  passwordChangedAt: Date;

  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;

  changedPasswordAfter(JWTTimestamp: number): boolean;
}

// Define the schema for the User model
const userSchema = new Schema<IUser>(
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
        message: 'Role is either: user or admin',
      },
      default: 'user',
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Please provide a password'],
      validate: {
        validator: function (v: string) {
          const passwordRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
          return passwordRegex.test(v);
        },
        message: (props: any) =>
          `Password must be at least 8 characters long and contain at least 1 number, 1 special character, 1 uppercase letter, and 1 lowercase letter`,
      },
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Define methods on the user schema
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check user change password after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
    10;

    return JWTTimestamp < changedTimeStamp; // 300 < 200
  }

  // false means not changed
  return false;
};

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);

  // Update the passwordChangedAt field to just before the current time
  if (!this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - 1000); // Set to 1 second before now
  }
  next();
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
