const _ = require('lodash');

/**
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

/**
 * @param {String} text
 * @returns {String}
 */
function shuffleString(text) {
  return shuffleArray(text.split('')).join('');
}

/**
 * @param {String} text
 * @see https://www.mrc-cbu.cam.ac.uk/people/matt-davis/cmabridge/
 */
function generateCambridgeText(text) {
  if (!_.isString(text)) {
    throw new TypeError('Parameter "text" should be a valid string');
  }

  return text
    .split(' ')
    .map((word) => {
      // If the word is less than 4 characters, the cambridge
      // transformation would produce the same result as the
      // original string.
      if (word.length < 4) {
        return word;
      }

      return word.replace(
        new RegExp('(.)(.+)(.)'),
        (_, firstLetter, middleOfWord, lastLetter) => {
          return `${firstLetter}${shuffleString(middleOfWord)}${lastLetter}`;
        },
      );
    })
    .join(' ');
}

module.exports = generateCambridgeText;
