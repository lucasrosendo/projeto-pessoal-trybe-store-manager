const sinon = require('sinon');
const { expect } = require('chai');

const service = require('../../../services/salesService');
const controller = require('../../../controllers/salesController');

describe('SALES CONTROLLER', () => {
  describe('GetAll', () => {
    const req = {};
    const res = {};
    let next = () => {};
    describe('Requisição OK', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(service, 'getAll').resolves([]);
      });

      after(() => {
        service.getAll.restore();
      });

      it('Retorna status 200', async () => {
        await controller.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });

    describe('Falha na requisição', () => {
      const err = Error('erro');

      before (() => {
        next = sinon.stub().returns();
        sinon.stub(service, 'getAll').throws(err);
      });

      after(() => {
        service.getAll.restore();
      });

      it('Passa o erro para frente', async () => {
        await controller.getAll(req, res, next);
        expect(next.calledWith(sinon.match(err))).to.be.equal(true);
      });
    });
  });

  describe('GetById', () => {
    const req = {};
    const res = {};
    let next = () => {};

    describe('Requisição OK', () => {
      before(() => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(service, 'getById').resolves([[]]);
      });

      after(() => {
        service.getById.restore();
      });

      it('Retorna status 200', async () => {
        await controller.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });

    describe('Falha na requisição', () => {
      const err = Error('erro');

      before (() => {
        next = sinon.stub().returns();
        sinon.stub(service, 'getById').throws(err);
      });

      after(() => {
        service.getById.restore();
      });

      it('Passa o erro para frente', async () => {
        await controller.getById(req, res, next);
        expect(next.calledWith(sinon.match(err))).to.be.equal(true);
      });
    });
  });
}); 
