"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addFieldsTransformer = (targetSchema) => {
    const transform = {
        virtuals: true, // Include virtuals
        versionKey: false, // Remove the __v field
        transform: (doc, ret) => {
            ret.id = ret._id; // Replace _id with id
            delete ret._id; // Remove the _id field
            return ret;
        }
    };
    // Add the `toJSON` option to transform the document
    targetSchema.set('toJSON', transform);
    // Add the `toObject` option if you need similar behavior when calling toObject()
    targetSchema.set('toObject', transform);
};
exports.default = addFieldsTransformer;
