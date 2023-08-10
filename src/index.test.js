const generateCambridgeText = require('./index');

const inputs = [
  'indul a gorog aludni',
  'indul a gorog aludni de meg nem is almos',
  'ez egy masik szoveg aminek mukodnie kell',
  'ez 4 sz0veg t4rt4lm4z szam0kat is',
];

test('invalid parameter', () => {
  expect(() => generateCambridgeText(['textInArray']))
    .toThrow(TypeError);
  expect(() => generateCambridgeText(123))
    .toThrow(TypeError);
  expect(() => generateCambridgeText(new Object()))
    .toThrow(TypeError);
});

test.each(inputs)(
  'same length for the entire string as well as each word',
  (input) => {
    expect(generateCambridgeText(input))
      .toHaveLength(input.length);

    // Check for length of words
    const words = input.split(' ');
    generateCambridgeText(input).split(' ')
      .map((cambridgeWord, index) => {
        expect(cambridgeWord).toHaveLength(words[index].length);
      });
  },
);

test.each(inputs)(
  'first and last letter should be the same as before transformation',
  (input) => {
    const words = input.split(' ');
    generateCambridgeText(input).split(' ')
      .map((cambridgeWord, index) => {
        const originalWord = words[index];
        // Check for the first letter
        expect(cambridgeWord[0]).toBe(originalWord[0]);
        // Check for the last letter
        expect(cambridgeWord[cambridgeWord.length - 1])
          .toBe(originalWord[originalWord.length - 1]);
      });
  },
);

test.each(inputs)(
  'middle part of the transformed words should have the same letter set as before',
  (input) => {
    function getMiddlePartOfWord(word) {
      return word.match('(.)(?<middle>.+)(.)')?.groups.middle || '';
    }

    const words = input.split(' ');
    generateCambridgeText(input).split(' ')
      .map((cambridgeWord, index) => {
        const originalLetterSet = getMiddlePartOfWord(words[index]).split('');
        const cambridgeLetterSet = getMiddlePartOfWord(cambridgeWord).split('');
        // Check for the letter set match and ignoring order of the set
        expect(originalLetterSet).toEqual(
          expect.arrayContaining(cambridgeLetterSet)
        );
      });
  },
);
