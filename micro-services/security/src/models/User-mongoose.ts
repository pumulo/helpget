import mongoose from "mongoose";

// interface used to ddescribe the properties used to create a new User
interface UserAttrs {
    name: string;
    password: string;
    email: string;
    status: string;
}

// properties that an User has
interface UserDoc extends mongoose.Document {
    name: string;
    password: string;
    email: string;
    status: string;
}

// interface that describnes the properties tha the model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// describe the schema stored in mongoose
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: true,
            default: 'Active'
        }
    }, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
};

const User = mongoose.model<UserDoc, UserModel>('user', UserSchema);

export { User };