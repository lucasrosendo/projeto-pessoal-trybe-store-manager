const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const model = require('../../../models/salesModel');

describe('SALES MODEL', () => {
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
      sinon.stub(connection, 'execute').resolves([getAllResponse, []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array de objetos', async () => {
      const sales = await model.getAll();
      expect(sales).to.be.an('array');
      expect(sales).not.to.be.empty;
      sales.forEach((e) => expect(e).to.be.an('object'));
    });
  });

  describe('GetById', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[getByIdResponse], []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const sale = await model.getById();
      expect(sale).to.be.an('array');
    });
  });

  describe('Delete', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(() => {
      connection.execute.restore();
    })

    it('Chama connection.execute', async () => {
      await model.deleteSale();
      expect(connection.execute.called).to.be.equal(true);
    });
  });

  describe('Update', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(() => {
      connection.execute.restore();
    })

    it('Chama connection.execute', async () => {
      await model.update();
      expect(connection.execute.called).to.be.equal(true);
    });
  });
}); 