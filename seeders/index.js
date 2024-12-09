const userSeeder = require("./user.seeder");
const articleSeeder = require("./article.seeder");
const commentSeeder = require("./comment.seeder");
module.exports = async () => {
  await userSeeder();
  await articleSeeder();
  await commentSeeder();
};
