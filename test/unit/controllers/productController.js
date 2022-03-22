const sinon = require('sinon');
const { expect } = require('chai');

const service = require('../../../services/productsService');
const controller = require('../../../controllers/productsController');

describe('PRODUCTS CONTROLLER', () => {
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

      it('Responde req com status 200', async () => {
        await controller.getAll(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
    });

    describe('Problema na requisição', () => {
      const err = Error('erro');

      before (() => {
        next = sinon.stub();
        sinon.stub(service, 'getAll').throws(err);
      });

      after(() => {
        service.getAll.restore();
      });

      it('O erro passa para frente', async () => {
        await controller.getAll(req, res, next);
        expect(next.calledWith(sinon.match(err))).to.be.equal(true);
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
          sinon.stub(service, 'getById').resolves({});
        });

        after(() => {
          service.getById.restore();
        });

        it('Responde req com status 200', async () => {
          await controller.getById(req, res, next);
          expect(res.status.calledWith(200)).to.be.equal(true);
        });
      });

      describe('Problema na requisição', () => {
        const err = Error('erro');

        before (() => {
          next = sinon.stub();
          sinon.stub(service, 'getById').throws(err);
        });

        after(() => {
          service.getById.restore();
        });

        it('O erro passa para frente', async () => {
          await controller.getById(req, res, next);
          expect(next.calledWith(sinon.match(err))).to.be.equal(true);
        });
      });
    });
  });
});