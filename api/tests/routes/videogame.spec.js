/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => conn.sync({ force: true }));
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
  });
});



//   it('crea una page en la base de datos', function(){
//     return agent.post('/pages')
//       .send({
//         title: 'hola',
//         content: 'chau',
//         authorEmail: 'toni@toni.com',
//         authorName: 'Franco',
//         categories: [1]
//       })
//       .then(() => {
//         return Page.findOne({
//           where: {
//             title: 'hola'
//           }
//         });
//       })
//       .then(page => {
//         expect(page).to.exist;
//       });
//   });
//   it('setea correctamente la categoría en la base de datos', function(){
//     return agent.post('/pages')
//       .send({
//         title: 'hola',
//         content: 'chau',
//         authorEmail: 'toni@toni.com',
//         authorName: 'Franco',
//         categories: [1,2]
//       })
//       .then(() => {
//         return Page.findOne({
//           where: {
//             title: 'hola'
//           },
//           include: {
//             model: Category
//           }
//         });
//       })
//       .then(page => {
//         expect(page.categories[0].name).to.equal('Autos');
//         expect(page.categories[1].name).to.equal('Deportes');
//       });
//   });
// });

// });

// describe('pedidos http USER', function () {
// beforeEach(function(){
//   return User.sync({ force: true })
// })