const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const model = require('../../../models/productsModel');

describe('PRODUCTS MODEL', () => {
  describe('Create', () => {
    const product = {
      name: 'Teste',
      quantity: 10,
    };

    before(async () => {
      const executeResponse = [{ insertId: 1 }];
      sinon.stub(connection, 'execute').resolves(executeResponse);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retorna um objeto', async() => {
      const result = await model.create(product);
      expect(result).to.be.an('object');
    });
  });

  describe('GetAll', () => {
    before(() => {
      const product = {
        id: 1,
        name: 'Teste unitario',
        quantity: 100,
      };

      const result = [[product], []];

      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array de objetos', async () => {
      const list = await model.getAll();
      expect(list).to.be.an('array');
      expect(list).not.to.be.empty;
      list.forEach((p) => expect(p).to.be.an('object'));
    });
  });

  describe('GetById', () => {
    before(async () => {
      const executeResponse = [[]];
      sinon.stub(connection, 'execute').resolves(executeResponse);
    });

    after(async () => {
      connection.execute.restore();
    });

    describe('Quando não existe produto com o id passado', () => {
      it('Retorna undefined', async () => {
        const result = await model.getById();
        expect(result).to.be.equal(undefined);
      });
    });

    describe('Quando existe um produto com o id passado', () => {
      before(() => {
        const product = {
          id: 1,
          name: 'Teste unitario',
          quantity: 500,
        };
        sinon.stub(model, 'getById').resolves(product);
      });

      after(() => {
        model.getById.restore();
      });

      it('Retorna um objeto', async () => {
        const result = await model.getById(1);
        expect(result).to.be.an('object');
      });
    });
  });

  describe('Delete', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve chamar connection.execute', async () => {
      await model.deleteProduct();
      expect(connection.execute.called).to.be.equal(true);
    })
  });
});