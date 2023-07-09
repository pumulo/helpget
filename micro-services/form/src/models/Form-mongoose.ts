import mongoose from "mongoose";

// interface used to ddescribe the properties used to create a new Form
interface FormAttrs {
    type: string;
    description: string;
    values: JSON;
    status: string;
}

// properties that an Form has
interface FormDoc extends mongoose.Document {
    type: string;
    description: string;
    values: JSON;
    status: string;
}

// interface that describnes the properties tha the model has
interface FormModel extends mongoose.Model<FormDoc> {
    build(attrs: FormAttrs): FormDoc;
}

// describe the schema stored in mongoose
const FormSchema = new mongoose.Schema(
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
                delete ret.__v;
            }
        }
    }
);

FormSchema.statics.build = (attrs: FormAttrs) => {
    return new Form(attrs)
};

const Form = mongoose.model<FormDoc, FormModel>('form', FormSchema);

export { Form };