// axiom.config.js
module.exports = {
  token: process.env.AXIOM_TOKEN, // Set this in your .env.local file
  orgId: process.env.AXIOM_ORG_ID, // Set this in your .env.local file
  dataset: process.env.AXIOM_DATASET || "cv-analytics"
};
