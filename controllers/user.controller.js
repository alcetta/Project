const { createUser, updateUser } = require("../services/user.service");

module.exports = {
  createUser: async function (req, resp) {
    const { name, username, password } = req.body;
    const user = { name, username, password };
    const newUser = await createUser(user);
    resp.send({ message: "User Created", data: newUser }).status(201);
  },
  updateUser: async function (req, resp) {
    const id = req.params.id;
    const { name, username, password } = req.body;
    const user = { name, username, password };
    const newUser = await updateUser(id, user);
    resp.send({ message: "User Updated", data: newUser }).status(201);
  },
};
