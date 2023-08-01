import mongoose from "mongoose";

// interface used to ddescribe the properties used to create a new Entity
interface EntityAttrs {
    type: string;
    description: string;
    values: JSON;
    status: string;
}

// properties that an Entity has
interface EntityDoc extends mongoose.Document {
    type: string;
    description: string;
    values: JSON;
    status: string;
}

// interface that describnes the properties tha the model has
interface EntityModel extends mongoose.Model<EntityDoc> {
    build(attrs: EntityAttrs): EntityDoc;
}

// describe the schema stored in mongoose
const EntitySchema = new mongoose.Schema(
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

EntitySchema.statics.build = (attrs: EntityAttrs) => {
    return new Entity(attrs)
};

const Entity = mongoose.model<EntityDoc, EntityModel>('entity', EntitySchema);

export { Entity, EntityDoc };