import mongoose from 'mongoose';

import bankModel from './bankModel.js';

const db = {};

db.url = 'mongodb://localhost:27017/accounts';
// 'mongodb+srv://testeacesso11:testeacesso11@cluster0.7xirx.gcp.mongodb.net/accounts?retryWrites=true&w=majority';
db.mongoose = mongoose;
db.bank = bankModel(mongoose);

export { db };
