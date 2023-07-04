import mongoose from "mongoose";

// interface used to ddescribe the properties used to create a new Entity
interface ActionAttrs {
    type: string;
    description: string;
    values: JSON;
    status: string;
}

// properties that an Action has
interface ActionDoc extends mongoose.Document {
    type: string;
    description: string;
    values: JSON;
    status: string;
}

// interface that describnes the properties tha the model has
interface ActionModel extends mongoose.Model<ActionDoc> {
    build(attrs: ActionAttrs): ActionDoc;
}

// describe the schema stored in mongoose
const ActionSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        values: {
            type: JSON,
            required: false
        },
        status: {
            type: String,
            required: true,
            default: 'Pending'
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                ret.version = ret.__v;
                delete ret.__v;
            }
        }
    }
);

ActionSchema.statics.build = (attrs: ActionAttrs) => {
    return new Action(attrs)
};

const Action = mongoose.model<ActionDoc, ActionModel>('action', ActionSchema);

export { Action };