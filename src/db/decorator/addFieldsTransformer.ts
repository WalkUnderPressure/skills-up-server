import { Schema, SchemaOptions } from "mongoose";

const addFieldsTransformer = (targetSchema: Schema) => {
    const transform: SchemaOptions['toJSON'] = {
        virtuals: true, // Include virtuals
        versionKey: false, // Remove the __v field
        transform: (doc, ret) => {    
            ret.id = ret._id; // Replace _id with id
            delete ret._id;   // Remove the _id field
            return ret;
        }
    };

    // Add the `toJSON` option to transform the document
    targetSchema.set('toJSON', transform);

    // Add the `toObject` option if you need similar behavior when calling toObject()
    targetSchema.set('toObject', transform);
}

export default addFieldsTransformer;
