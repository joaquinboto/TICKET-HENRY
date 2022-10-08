const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`); // eslint-disable-line no-console
  });
});
