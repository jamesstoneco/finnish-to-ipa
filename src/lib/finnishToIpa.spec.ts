// tslint:disable:no-expression-statement
import test from 'ava';
import {
  asChars,
  buildReplaceReplaceRegEx,
  dropKsi,
  // finnishToIpa,
  replaceDoubledChars,
  replaceOtherVariations
} from './finnishToIpa';

test('dropKsi', t => {
  t.is(dropKsi('uksi'), 'uks');
});

// test('replace all h letters in the word', t => {
//   t.is(replaceH('uksi'), 'uks');
// });

test('build regex value', t => {
  t.deepEqual(buildReplaceReplaceRegEx('ng'), /ng/g);
});

test('replace all other varations', t => {
  t.is(replaceOtherVariations('onginkonp'), 'oŋːiŋkomp');
});

test('return as array of chars', t => {
  t.deepEqual(asChars('abc'), ['a', 'b', 'c']);
});

test('replaced doubeld chars', t => {
  t.is(replaceDoubledChars('aathothaiibioccao'), 'aːthothaiːbiocːao');
});

test('everything', t => {
  // t.is(
  //   finnishToIpa('anteksi, paljonko tämä maksaa'),
  //   'ɑnteks, pɑljoŋko tæmæ mɑksɑː'
  // );
  t.is(replaceOtherVariations('onginkonp'), 'oŋːiŋkomp');
});
