const { Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Genre model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Genre.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Genre.create({
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Genre.create({ name: 'Action' });
      });
    });
  });
});


// describe('image', () => {
//   it('should throw an error if image is null', (done) => {
//     Videogame.create({
//     })
//       .then(() => done(new Error('It requires a valid image')))
//       .catch(() => done());
//   });
//   it('should work when its a valid descrciption', () => {
//     Recipe.create({ image: 'valid URL' });
//   });
// });
// describe('description', () => {
//   it('should throw an error if description is null', (done) => {
//     Videogame.create({
//     })
//       .then(() => done(new Error('It requires a valid description')))
//       .catch(() => done());
//   });
//   it('should work when its a valid description', () => {
//     Recipe.create({ description: 'valid description' });
//   });
// });
// describe('release date', () => {
//   it('should throw an error if release date is null', (done) => {
//     Videogame.create({
//     })
//       .then(() => done(new Error('It requires a release date')))
//       .catch(() => done());
//   });
//   it('should work when its a valid release date', () => {
//     Recipe.create({ date: '10/10/1990' });
//   });
// });