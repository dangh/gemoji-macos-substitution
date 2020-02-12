const fs = require('fs');
const plist = require('plist');
const gemoji = require('gemoji');
const emoticon = require('emoticon');
const personal = require('./personal');

let gemojies = gemoji
  .filter(g => ['Smileys & Emotion'].includes(g.category))
  .flatMap(({ emoji, names }) =>
    names.map(name => ({ phrase: emoji, shortcut: ':' + name + ':' }))
  );
let emoticons = emoticon.flatMap(({ emoji, emoticons }) => {
  if (emoji == '😗') emoji = '😙';
  return emoticons.map(emoticon => ({ phrase: emoji, shortcut: emoticon }));
});
let personals = personal.flatMap(({ phrase, shortcuts }) =>
  shortcuts.map(shortcut => ({ phrase, shortcut }))
);
let all = [].concat(personals, emoticons, gemojies);

generatePlist('gemoji', gemojies);
generatePlist('emoticon', emoticons);
generatePlist('personal', personals);
generatePlist('all', all);

function generatePlist(name, substitutions) {
  fs.writeFileSync('./' + name + '.plist', plist.build(substitutions));
}
