import R from 'ramda';

// http://jkorpela.fi/suomi/fon.html

type MatchingPair = readonly string[];
type MatchingPairList = ReadonlyArray<MatchingPair>;
// finnish character, then ipa
export const consonants: MatchingPairList = [
  ['b', 'b'],
  ['c', 'k'],
  ['d', 'd'],
  ['f', 'f'],
  ['g', 'ɡ'],
  ['j', 'j'],
  ['k', 'k'],
  ['l', 'l'],
  ['m', 'm'],
  ['n', 'n'],
  ['n', 'ŋ'],
  ['p', 'p'],
  ['r', 'r'],
  ['s', 's'],
  ['š', 'ʃ'],
  ['t', 't'],
  ['v', 'ʋ'],
  ['w', 'ʋ'],
  ['z', 'ts'],
  ['ž', 'ʒ'],
  ['ʔ', "'"]
];

export const doubledLettersAnnotation = 'ː';

export const vowels: MatchingPairList = [
  ['a', 'ɑ'],
  ['ä', 'æ'],
  ['e', 'e'],
  ['i', 'i'],
  ['o', 'o'],
  ['ö', 'ø'],
  ['u', 'u'],
  ['y', 'y']
];

export const diphthongs: MatchingPairList = [
  ['ai', 'ɑj'],
  ['au', 'ɑw'],
  ['äi', 'æj'],
  ['äy', 'æɥ'],
  ['ei', 'ej'],
  ['eu', 'ew'],
  ['ey', 'eɥ'],
  ['ie', 'ie̯'],
  ['iu', 'iw'],
  ['iy', 'iɥ'],
  ['oi', 'oj'],
  ['oe', 'oj'],
  ['ou', 'ow'],
  ['öi', 'øj'],
  ['öy', 'øɥ'],
  ['ui', 'ui'],
  ['uo', 'uo̯'],
  ['yi', 'yj'],
  ['yö', 'yø̯']
];

export const otherVariations: MatchingPairList = [
  ['ng', 'ŋː'],
  ['nk', 'ŋk'],
  ['np', 'mp']
];

export const buildReplaceReplaceRegEx = (findValue: string) =>
  new RegExp(findValue, 'g');

export const replaceSet = (set: MatchingPairList, s: string) =>
  R.reduce((acc: string, v) => acc.replace(v[0], v[1]), s, set);

export const replaceOtherVariations = (s: string) =>
  replaceSet(otherVariations, s);

export const specialCaseH: MatchingPairList = [
  ['h', 'ɦ'], // between vowels
  ['h', 'ç'], // between front vowel and constant
  ['h', 'x'] // between back vowel and constant
];

export const allLetters = () => {
  return R.map(c => c[0], R.flatten([consonants, vowels, ['h']]));
};
export const asChars = (s: string) => s.split('');

export const replaceDoubledChars = (s: string) => {
  return R.reduce(
    (acc: string, l) =>
      acc.replace(`${l}${l}`, `${l}${doubledLettersAnnotation}`),
    s,
    allLetters()
  );
};

export const replaceH = (s: string) => {
  return 'false' + s;
};
export const dropKsi = (s: string) => s.replace('ksi', 'ks');

export const finnishToIpa = (s: string) => {
  const firstPass = replaceDoubledChars(dropKsi(s));
  return R.reduce(
    (acc: string, set: MatchingPairList) => replaceSet(set, acc),
    firstPass,
    [otherVariations, diphthongs, vowels, consonants]
  );
  // const secondPass = replaceSet(otherVariations, firstPass);
};

// final i is sometmies dropped, after ks

// stress rules: always on first, 2x on some compound words, both syllables in two-syllable imparatives
