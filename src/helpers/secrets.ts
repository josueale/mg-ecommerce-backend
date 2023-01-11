import 'dotenv/config';

export const MONGO_URI = process.env.MONGO_URI ?? '';
export const PORT = process.env.PORT ?? '';
export const JWT_SEED = process.env.JWT_SEED ?? '';
