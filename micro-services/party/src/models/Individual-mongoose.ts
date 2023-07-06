import mongoose from "mongoose";
import { ContactInfoAttrs, ContactInfoSchema } from "./ContactInfo-mongoose";

// interface used to describe the properties used to create a new Individual
interface IndividualAttrs {
    firstName: string;
    middleName: string;
    lastName: string;
    contactInfo: ContactInfoAttrs;
    description: string;
    values: JSON;
    status: string;
}

// properties that an Individual has
interface IndividualDoc extends mongoose.Document {
    firstName: string;
    middleName: string;
    lastName: string;
    contactInfo: ContactInfoAttrs;
    description: string;
    values: JSON;
    status: string;
}

// interface that describnes the properties tha the model has
interface IndividualModel extends mongoose.Model<IndividualDoc> {
    build(attrs: IndividualAttrs): IndividualDoc;
}

// describe the schema stored in mongoose
const IndividualSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: true
        },
        contactInfo: {
            type: ContactInfoSchema,
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

IndividualSchema.statics.build = (attrs: IndividualAttrs) => {
    return new Individual(attrs)
};

const Individual = mongoose.model<IndividualDoc, IndividualModel>('individual', IndividualSchema);

export { Individual };