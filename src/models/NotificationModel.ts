import { Schema } from 'mongoose';

import createModel from './lib/createModel';

type NotificationType = {
    id: string;
    userId: string;
    title: string;
    description: string;
    href: string;
    createdAt: number;
}

const NotificationSchema = new Schema({
    userId: { type: Schema.ObjectId },
    title: { type: String },
    description: { type: String },
    href: { type: String },
    createdAt: { type: Number },
});

const NotificationModel = createModel('notifications', NotificationSchema);

export { NotificationSchema, NotificationModel, NotificationType };
