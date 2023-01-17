import { Schema, model } from 'mongoose';

const _Schema = new Schema({}, { versionKey: false, timestamps: true });

const Posts = model('post', _Schema);

export default Posts;
