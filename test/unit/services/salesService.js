const sinon = require('sinon');
const { expect } = require('chai');

const model = require('../../../models/salesModel');
const service = require('../../../services/salesService');

describe('SALES SERVICE', () => {
  const getAllResponse = [
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 1,
        "quantity": 5,
        "saleId": 1
    },
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 2,
        "quantity": 10,
        "saleId": 1
    },
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 3,
        "quantity": 15,
        "saleId": 2
    }
  ];

  const getByIdResponse = [
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 1,
        "quantity": 5
    },
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 2,
        "quantity": 10
    }
  ];

  describe('GetAll', () => {
    before(() => {
      sinon.stub(model, 'getAll').resolves(getAllResponse);
    });

    after(() => {
      model.getAll.restore();
    });

    it('Retorna um array de objetos', async () => {
      const sales = await service.getAll();
      expect(sales).to.be.an('array');
      expect(sales).to.not.be.empty;
      sales.forEach((e) => expect(e).to.be.an('object'));
    });
  });

  describe('GetById', () => {
    before(() => {
      sinon.stub(model, 'getById').resolves(getByIdResponse);
    });

    after(() => {
      model.getById.restore();
    });

    it('Retorna um array de objetos', async () => {
      const sale = await service.getById();
      expect(sale).to.be.an('array');
      expect(sale).not.to.be.empty;
      sale.forEach((e) => expect(e).to.be.an('object'));
    });
  });

  describe('DeleteSale', () => {
    before(() => {
      sinon.stub(model, 'deleteSale').resolves();
    });

    after(() => {
      model.deleteSale.restore();
    });

    it('Chama model.deleteSale', async () => {
      await service.deleteSale();
      expect(model.deleteSale.called).to.be.equal(true);
    });
  });

  describe('Update', () => {
    before(() => {
      sinon.stub(model, 'update').resolves();
    });

    after(() => {
      model.update.restore();
    });

    it('Chama model.update', async () => {
      await service.update();
      expect(model.update.called).to.be.equal(true);
    });
  });
}); 