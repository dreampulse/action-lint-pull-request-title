const lint = require('@commitlint/lint').default;
const config = require('../commitlint.config.js');

module.exports = async function validatePrTitle(prTitle) {
  const result = await lint(prTitle, config.rules);

  if (!result.valid) {
    const errorMessages = result.errors.map((error) => error.message);
    throw new Error(errorMessages.join('; '));
  }
};
