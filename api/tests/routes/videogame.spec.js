/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { default: Videogames } = require('../../../client/src/components/Videogames/Videogames.jsx');
const app = require('../../src/app.js');
const { Videogame, Genre, conn } = require('../../src/db.js');
// const Genre = require('../../src/models/Genre.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('POST /videogame', () => {
    it('should get 200', () =>
      agent.post('/videogame').send({
        name: 'Mario Bross',
        image: 'image',
        description: 'content',
        releaseDate: '10/10/2020',
        rating: '5',
        platforms: ['Play Station'],
        createdInDB: 'true',
        genres: ['Action']
      }).expect(200)
    );
    // it('creates a videogame in database', function(){
    //   return agent.post('/videogame')
    //     .send({
    //       name: 'Mario Bross',
    //       image: 'image',
    //       description: 'content',
    //       releaseDate: '10/10/2020',
    //       rating: '5',
    //       platforms: ['Play Station'],
    //       createdInDB: 'true',
    //       genres: ['Action']
    //     })
    //     .then(() => {
    //       return Videogames.findOne({
    //         where: {
    //           name: 'Mario Bross'
    //         }
    //       });
    //     })
    //     .then(videogame => {
    //       expect(videogame).to.exist;
    //     });
    // });
    // it('sets correctly the genres in database', function(){
    //   return agent.post('/videogame')
    //     .send({
    //       name: 'Mario Bross',
    //       image: 'image',
    //       description: 'content',
    //       releaseDate: '10/10/2020',
    //       rating: '5',
    //       platforms: ['Play Station'],
    //       createdInDB: 'true',
    //       genres: ['Action']
    //     })
    //     .then(() => {
    //       return Videogames.findOne({
    //         where: {
    //           name: 'Mario Bross'
    //         },
    //         include: {
    //           model: Genre
    //         }
    //       });
    //     })
    //     .then(videogame => {
    //       expect(videogame.genres[0].name).to.equal('Action');
    //     });
    // });
  });
});

