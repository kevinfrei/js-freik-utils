import { Attributes, Media } from '../index';
const log = false ? console.log : (a: unknown) => {};

it('Generic path', () => {
  const filename = 'something/artist - 1983 - album/01 - title.m4a';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '1983',
    album: 'album',
    track: '01',
    title: 'title',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 1983,
    album: 'album',
    track: 1,
    title: 'title',
  });
});

it('Generic path, Two Primary artists', () => {
  const filename =
    'something/artist 1 & artist 2 - 1983 - album/01 - title.m4a';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist 1 & artist 2',
    year: '1983',
    album: 'album',
    track: '01',
    title: 'title',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: ['artist 1', 'artist 2'],
    year: 1983,
    album: 'album',
    track: 1,
    title: 'title',
  });
});

it('Generic path, Multiple Primary artists', () => {
  const filename =
    'something/artist 1, artist 2, artist 3 & artist 4 - 1983 - album/01 - title.m4a';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist 1, artist 2, artist 3 & artist 4',
    year: '1983',
    album: 'album',
    track: '01',
    title: 'title',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: ['artist 1', 'artist 2', 'artist 3', 'artist 4'],
    year: 1983,
    album: 'album',
    track: 1,
    title: 'title',
  });
});

it('Generic path, no year', () => {
  const filename = 'something/artist - album/01 - title.mp3';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    album: 'album',
    track: '01',
    title: 'title',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    album: 'album',
    track: 1,
    title: 'title',
  });
});

it('Generic path, other artist', () => {
  const filename =
    'something/artist - 1983 - album/02 - title [feat- Other Artist].aac';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '1983',
    album: 'album',
    track: '02',
    title: 'title [feat- Other Artist]',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 1983,
    album: 'album',
    track: 2,
    title: 'title',
    moreArtists: ['Other Artist'],
  });
});

it('Generic path, 2 other artists', () => {
  const filename =
    'something/artist - 1983 - album/02 - title [feat- Other Artist 1 & Other Artist 2].aac';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '1983',
    album: 'album',
    track: '02',
    title: 'title [feat- Other Artist 1 & Other Artist 2]',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 1983,
    album: 'album',
    track: 2,
    title: 'title',
    moreArtists: ['Other Artist 1', 'Other Artist 2'],
  });
});

it('Generic path, multiple other artists', () => {
  const filename =
    'something/artist - 1983 - album/02 - title [feat- Other Artist 1, Other Artist 2 & Other Artist 3].aac';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '1983',
    album: 'album',
    track: '02',
    title: 'title [feat- Other Artist 1, Other Artist 2 & Other Artist 3]',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 1983,
    album: 'album',
    track: 2,
    title: 'title',
    moreArtists: ['Other Artist 1', 'Other Artist 2', 'Other Artist 3'],
  });
});

it('VA, other artist', () => {
  const filename =
    'something/VA - 1983 - album/02 - artist - title [with Other Artist].flac';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '1983',
    album: 'album',
    compilation: 'va',
    track: '02',
    title: 'title [with Other Artist]',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 1983,
    album: 'album',
    track: 2,
    title: 'title',
    moreArtists: ['Other Artist'],
    vaType: 'va',
  });
});

it('Soundtrack, other artist', () => {
  const filename =
    'something/Soundtrack - 2001 - album/02 - artist - title [featuring Other Artist].m4a';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '2001',
    album: 'album',
    compilation: 'ost',
    track: '02',
    title: 'title [featuring Other Artist]',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 2001,
    album: 'album',
    track: 2,
    title: 'title',
    moreArtists: ['Other Artist'],
    vaType: 'ost',
  });
});

it('variation', () => {
  const filename =
    'something/artist - 2001 - album/02 - title [live][goofy remix].m4a';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '2001',
    album: 'album',
    track: '02',
    title: 'title [live][goofy remix]',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 2001,
    album: 'album',
    track: 2,
    title: 'title',
    variations: ['live', 'goofy remix'],
  });
});

it('variation with additional artist', () => {
  const filename =
    'something/artist - 2001 - album/02 - title [live][goofy remix] [feat- foobar].m4a';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '2001',
    album: 'album',
    track: '02',
    title: 'title [live][goofy remix] [feat- foobar]',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 2001,
    album: 'album',
    track: 2,
    title: 'title',
    moreArtists: ['foobar'],
    variations: ['live', 'goofy remix'],
  });
});

it('variation with additional artist and spaces', () => {
  const filename =
    'something/artist - 2001 - album/02 - title  [live]  [feat- foobar]  [goofy remix] .flac';
  const md = Media.fromPath(filename);
  expect(md).toEqual({
    artist: 'artist',
    year: '2001',
    album: 'album',
    track: '02',
    title: 'title  [live]  [feat- foobar]  [goofy remix] ',
  });
  log(md);
  const fmd = Media.FullFromObj(filename, (md as unknown) as Attributes);
  expect(fmd).toEqual({
    originalPath: filename,
    artist: 'artist',
    year: 2001,
    album: 'album',
    track: 2,
    title: 'title',
    moreArtists: ['foobar'],
    variations: ['live', 'goofy remix'],
  });
});

it('Artist Splitting', () => {
  const art1 = 'Artist #1 & Artist #2';
  const spl1 = Media.splitArtistString(art1);
  expect(spl1).toEqual(['Artist #1', 'Artist #2']);
  const art2 = 'Artist 1, Artist 2 & Artist 3';
  const spl2 = Media.splitArtistString(art2);
  expect(spl2).toEqual(['Artist 1', 'Artist 2', 'Artist 3']);
  const art3 = 'Artist 1, Artist 2';
  const spl3 = Media.splitArtistString(art3);
  expect(spl3).toEqual([art3]);
});