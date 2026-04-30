const bcrypt = require("bcrypt");

bcrypt.hash("john123", 10).then(console.log);