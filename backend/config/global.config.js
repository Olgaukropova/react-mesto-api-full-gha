const MONGO = process.env.MONGO || 'mongodb://127.0.0.1:27017/mestodb';
const PORT = process.env.PORT || 3000;

module.exports = {
  MONGO, PORT,
};
