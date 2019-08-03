const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;


describe("Test de creación de carro", function() {

  it("El Carro podria no recibir productos", function() {
    const coTest = new CarInsurance();
    const products = coTest.updatePrice();
    expect(products.length,0);
    
  });

  it("El Carro debe recibir un producto", function() {
    const coTest = new CarInsurance([ new Product("foo", 10, 20)]);
    const products = coTest.updatePrice();

    expect(products[0].name).equal("foo");
    expect(products[0].sellIn).equal(9);
    expect(products[0].price).equal(19);

  });

  it("El Carro debe recibir más de un producto", function() {
    const coTest = new CarInsurance([ new Product("foo", 10, 20),new Product("foo2", 11, 21) ]);
    const products = coTest.updatePrice();

    expect(products[0].name).equal("foo");
    expect(products[0].sellIn).equal(9);
    expect(products[0].price).equal(19);

    expect(products[1].name).equal("foo2");
    expect(products[1].sellIn).equal(10);
    expect(products[1].price).equal(20);
  });

});

describe("Test de Producto normales", function() {

  it("Si la fecha de venta no ha expirado, cada día disminuye en uno los días de venta y en uno el precio.", function() {
    const coTest = new CarInsurance([ new Product("foo", 10, 20) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("foo");
    expect(products[0].sellIn).equal(9);
    expect(products[0].price).equal(19);
  });

  it("Si la fecha de venta expiró, cada día disminuye en uno los días de venta y el precio disminuye en dos.", function() {
    const coTest = new CarInsurance([ new Product("foo", 0, 20) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("foo");
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(18);
  });

  it("El precio de venta no puede ser negativo", function() {
    const coTest = new CarInsurance([ new Product("foo", 0, 0) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("foo");
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(0);
  });

});

describe("Test de Producto 'Super Sale'", function() {

  it("Si la fecha de venta no ha expirado, cada día disminuye en uno los días de venta y en dos el precio.", function() {
    const coTest = new CarInsurance([ new Product("Super Sale", 10, 20) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Super Sale");
    expect(products[0].sellIn).equal(9);
    expect(products[0].price).equal(18);
  });

  it("Si la fecha de venta expiró, cada día disminuye en uno los días de venta y el precio disminuye en cuatro.", function() {
    const coTest = new CarInsurance([ new Product("Super Sale", 0, 20) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Super Sale");
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(16);
  });

  it("El precio de venta no puede ser negativo", function() {
    const coTest = new CarInsurance([ new Product("Super Sale", 0, 0) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Super Sale");
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(0);
  });

});

describe("Test de Producto 'Full Coverage'", function() {

  it("Si la fecha de venta no ha expirado, cada día disminuye en uno los días de venta pero aumenta en uno el precio.", function() {
    const coTest = new CarInsurance([ new Product("Full Coverage", 10, 20) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Full Coverage");
    expect(products[0].sellIn).equal(9);
    expect(products[0].price).equal(21);
  });

  it("Si la fecha de venta expiró, cada día disminuye en uno los días de venta pero aumenta en dos el precio.", function() {
    const coTest = new CarInsurance([ new Product("Full Coverage", 0, 20) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Full Coverage");
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(22);
  });

  it("El precio de venta no puede ser mayor a 50", function() {
    const coTest = new CarInsurance([ new Product("Full Coverage", 0, 50) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Full Coverage");
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(50);
  });

});

describe("Test de Producto 'Mega Coverage'", function() {

  it("Si la fecha de venta no ha expirado, no debe expirar o disminuir su precio.", function() {
    const coTest = new CarInsurance([ new Product("Mega Coverage", 0, 80) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Mega Coverage");
    expect(products[0].sellIn).equal(0);
    expect(products[0].price).equal(80);
  });

  it("Si la fecha de venta expiró, no debe expirar o disminuir su precio.", function() {
    const coTest = new CarInsurance([ new Product("Mega Coverage", -1, 80) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Mega Coverage");
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(80);
  });

});

describe("Test de Producto 'Special Full Coverage'", function() {

  it("Si la fecha de venta no ha expirado y quedan más de diez días, cada día disminuye en uno los días de venta pero aumenta en uno el precio.", function() {
    const coTest = new CarInsurance([ new Product("Special Full Coverage", 11, 20) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Special Full Coverage");
    expect(products[0].sellIn).equal(10);
    expect(products[0].price).equal(21);
  });

  it("Si la fecha de venta no ha expirado y quedan entre seis y diez días, cada día disminuye en uno los días de venta pero aumenta en dos el precio.", function() {
    [10,9,8,7,6].forEach( (dias) => {
      precio = dias + 5;
      const coTest = new CarInsurance([ new Product("Special Full Coverage", dias, precio) ]);
      const products = coTest.updatePrice();
      expect(products[0].name).equal("Special Full Coverage");
      expect(products[0].sellIn).equal(dias - 1);
      expect(products[0].price).equal(precio + 2);
    })
  });

  it("Si la fecha de venta no ha expirado y quedan entre uno y cinco días, cada día disminuye en uno los días de venta pero aumenta en tres el precio.", function() {
    [5,4,3,2,1].forEach( (dias) => {
      precio = dias + 5;
      const coTest = new CarInsurance([ new Product("Special Full Coverage", dias, precio) ]);
      const products = coTest.updatePrice();
      expect(products[0].name).equal("Special Full Coverage");
      expect(products[0].sellIn).equal(dias - 1);
      expect(products[0].price).equal(precio + 3);
    })
  });

  it("Si la fecha de venta expiró, cada día disminuye en uno los días de venta pero el precio queda en 0.", function() {
    const coTest = new CarInsurance([ new Product("Special Full Coverage", 0, 20) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Special Full Coverage");
    expect(products[0].sellIn).equal(-1);
    expect(products[0].price).equal(0);
  });

  it("El precio de venta no puede ser mayor a 50 si queda más de un día para que expire la venta", function() {
    const coTest = new CarInsurance([ new Product("Special Full Coverage", 1, 50) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Special Full Coverage");
    expect(products[0].sellIn).equal(0);
    expect(products[0].price).equal(50);
  });

  it("El precio de venta no puede superar los 50 aún cuando queden entre 1 a 5 días de venta", function() {
    const coTest = new CarInsurance([ new Product("Special Full Coverage", 1, 49) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("Special Full Coverage");
    expect(products[0].sellIn).equal(0);
    expect(products[0].price).equal(50);
  });

});