const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    let validParams;
    beforeEach(() => {
      validParams = { name: 'Mario', description: 'asd', platforms: ['Play Station'] };
      return Videogame.sync({ force: true })
    });
    describe('valid function', () => {
      it('should work when its valid parameters', (done) => {
        Videogame.create(validParams)
        .then(() => done())
        .catch(() => done(new Error('Parameters are not valid')))
      });
    })
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({...validParams, name: null})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    });
    
  });
});
