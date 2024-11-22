import mongoose from "mongoose";

const createModel = (schemaName: string, schema: any) => {
    return mongoose.models[schemaName] || mongoose.model(schemaName, schema);
}

export default createModel;
