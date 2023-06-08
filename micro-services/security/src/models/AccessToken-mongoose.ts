import mongoose from "mongoose";

// interface used to ddescribe the properties used to create a new AccessToken
interface AccessTokenAttrs {
    userId: string;
    token: string;
    email: JSON;
    status: string;
}

// properties that an AccessToken has
interface AccessTokenDoc extends mongoose.Document {
    name: string;
    password: string;
    email: JSON;
    status: string;
}

// interface that describnes the properties tha the model has
interface AccessTokenModel extends mongoose.Model<AccessTokenDoc> {
    build(attrs: AccessTokenAttrs): AccessTokenDoc;
}

// describe the schema stored in mongoose
const AccessTokenSchema = new mongoose.Schema(
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

AccessTokenSchema.statics.build = (attrs: AccessTokenAttrs) => {
    return new AccessToken(attrs)
};

const AccessToken = mongoose.model<AccessTokenDoc, AccessTokenModel>('access_token', AccessTokenSchema);

export { AccessToken };