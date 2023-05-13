import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';
import { getAllTeams, oneTeam } from './mocks/mock.teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoint GET /teams', () => {
  let chaiHttpResponse: Response;

  it('deve retornar um array de times e retornar status 200', async () => {
    sinon.stub(Team, 'findAll').resolves(getAllTeams as Team[]);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.be.deep.equal(getAllTeams);
  });

  it('endpoint /teams/:id deve retornar um objeto e retornar status 200', async () => {
    sinon.stub(Team, 'findOne').resolves(oneTeam as Team);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('object');
    expect(body).to.be.deep.equal(oneTeam);
  });
});
