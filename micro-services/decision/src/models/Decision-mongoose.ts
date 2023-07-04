import mongoose from "mongoose";

// interface used to ddescribe the properties used to create a new Decision
interface DecisionAttrs {
    type: string;
    description: string;
    values: JSON;
    status: string;
}

// properties that an Decision has
interface DecisionDoc extends mongoose.Document {
    type: string;
    description: string;
    values: JSON;
    status: string;
}

// interface that describnes the properties tha the model has
interface DecisionModel extends mongoose.Model<DecisionDoc> {
    build(attrs: DecisionAttrs): DecisionDoc;
}

// describe the schema stored in mongoose
const DecisionSchema = new mongoose.Schema(
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
});

DecisionSchema.statics.build = (attrs: DecisionAttrs) => {
    return new Decision(attrs)
};

const Decision = mongoose.model<DecisionDoc, DecisionModel>('decision', DecisionSchema);

export { Decision };