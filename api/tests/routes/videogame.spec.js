/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, Genre, conn } = require('../../src/db.js');

const agent = session(app);

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => conn.sync({ force: true })
  .then(() => Genre.create({ name: 'Action'})));
  describe('POST /videogame', () => {
    it('should get 200', () =>
        agent.post('/videogame').send({
        name: 'Super Mario Bross',
        description: 'abc',
        platforms: ['Play Station'],
        genres: ['Action', 'Adventure']
      }).expect(200)
    );
    it('creates a videogame in database', function(){
      return agent.post('/videogame')
      .send({
        name: 'Super Mario Bross',
        description: 'abc',
        platforms: ['Play Station'],
        genres: ['Action', 'Adventure']
      })
      .then(() => {
        return Videogame.findOne({
          where: {
            name: 'Super Mario Bross'
          }
        })
      })
      .then(videogame => {
        expect(videogame).to.exist;
      })
    })
    it('sets correctly the Genre in database', function() {
      return agent.post('/videogame')
      .send ({
        name: 'Super Mario Bross',
        description: 'abc',
        platforms: ['Play Station'],
        genres: ['Action', 'Adventure']
      })
      .then(() => {
        return Videogame.findOne({
          where: {
            name: 'Super Mario Bross'
          },
          include: {
            model: Genre
          }
        })
      })
      .then(videogame => {
        expect(videogame.genres[0].name).to.equal('Action')
      })
    })
  });
});
