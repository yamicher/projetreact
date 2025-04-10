// api/models/User.js
module.exports = {
  datastore: 'default',
  tableName: 'users',
  attributes: {
    nom: { type: 'string', required: true },
    categorie: { type: 'string', required: true },
  },
};
