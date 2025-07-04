// app.config.js
import 'dotenv/config';

export default {
  expo: {
    // ...other config
    extra: {
      LICENSE_SECRET: process.env.LICENSE_SECRET,
      // add other env vars here
    },
  },
};