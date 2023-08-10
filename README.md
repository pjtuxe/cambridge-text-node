# Cambridge Text Generator Library

This library ables to generate Cambridge-text from a specific text.

Cambridge-text follows the following rules:

- Each word should have the same length as before
- Each word's first and last letter should be the same as before
- The middle part of the words should contain the same character set as before

## Usage

Cambridge-text could be generated through a simple function call like:

```javascript
const generateCambridgeText = require('cambridge-text-node');
// This call will generate Cambridge-text synchronously
generateCambridgeText('indul a gorog aludni');
```

## Run tests

Tests can be run with the following command:

```bash
// Just once, before the first run
% npm install
% npm run test
```
