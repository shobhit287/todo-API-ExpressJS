const cors = require("cors");
const { allowedDomains } = require("./constant");

const corsOptions = {
  origin: function (origin, callback) {
    try {
      if (allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        let msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        callback(new Error(msg), false);
      }
    } catch (error) {
      let msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      callback(new Error(msg), false);
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

module.exports = cors(corsOptions);
