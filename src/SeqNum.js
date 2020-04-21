// @flow
// @format

// usage:
// const generator = require('SeqNum')('prefix');
// newSeqNum = generator();
// anotherSeqNum = generator();

module.exports = (prefix: ?string, resume: ?string): (() => string) => {
  const pref = prefix || '';
  let curId = 0;
  if (resume) {
    curId = parseInt(resume.substr(pref.length), 36);
    curId++;
  }
  return () => pref + (curId++).toString(36);
};
