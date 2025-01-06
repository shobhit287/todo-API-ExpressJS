const cors = require("cors");
const { allowedDomains } = require("./constant");

const corsOptions = {
  origin: function (origin, callback) {
    try {
      console.log("ORIGIN:", origin, allowedDomains)
      if (allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        const msg = `The CORS policy for this site does not allow access from the specified Origin(${origin}).`;
        callback(new Error(msg), false);
      }
    } catch (error) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin`;
      callback(new Error(msg), false);
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

module.exports = cors(corsOptions);
