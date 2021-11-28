const wordTable = {
  // word: key
  'Feed': 'feature.FEED',
  'Photo': 'feature.PHOTO',
  'Watch': 'feature.WATCH'
}

const codeTable = {
  3002: 'error.INCORRECT_EMAIL_OR_PASSWORD'
}

export const I18nUtil = {
  wordToKey: (word: string) => {
    if (wordTable[word]) {
      return wordTable[word];
    }
    return '';
  },
  codeToKey: (code: number) => {
    if (codeTable[code]) {
      return codeTable[code];
    }
    return '';
  }
}