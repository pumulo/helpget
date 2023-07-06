import mongoose from "mongoose";

interface AddressAttrs {
    description: string;
    streetAddressOne: string;
    streetAddressTwo: string;
    city: string;
    stateProvince: string;
    country: string;
    zipPostalCode: string;
    values: JSON;
    status: string;
}

interface ContactInfoAttrs {
    tel: [number];
    email: [string];
    address: [AddressAttrs];
}

// describe the schema stored in mongoose
const AddressSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: false
        },
        streetAddressOne: {
            type: String,
            required: false
        },
        streetAddressTwo: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        stateProvince: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        zipPostalCode: {
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
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

const ContactInfoSchema = new mongoose.Schema(
    {
        tel: [
            Number
        ],
        email: [
            String
        ],
        address: [
            {
                type: AddressSchema,
                required: true,
            }
        ],
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

export { ContactInfoAttrs, ContactInfoSchema };