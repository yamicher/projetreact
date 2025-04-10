// api/controllers/UserController.js
module.exports = {
  // Créer un film
  create: async function (req, res) {
    try {
      const { nom, categorie } = req.body;
      const film = await User.create({ nom, categorie }).fetch();
      return res.json({ message: "Voici votre film :", film });
    } catch (err) {
      return res.serverError(err);
    }
  },
};