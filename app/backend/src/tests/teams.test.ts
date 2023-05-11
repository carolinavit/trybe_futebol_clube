import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const getAllTeams = [
  {
    id: 1,
    teamName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    teamName: 'Bahia',
  },
  {
    id: 3,
    teamName: 'Botafogo',
  },
];

describe('Testa endpoint /teams', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Team, 'findAll').resolves(getAllTeams as Team[]);
  });

  after(() => {
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('deve retornar um array de times e retornar status 200', async () => {
    const { status, body} = await chai.request(app).get("/teams")

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.be.deep.equal(getAllTeams);
  });
});
