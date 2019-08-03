const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;
const SuperSale = coTest.SuperSale;
const FullCoverage = coTest.FullCoverage;
const MegaCoverage = coTest.MegaCoverage;
const SpecialFullCoverage = coTest.SpecialFullCoverage;

const productsAtDayZero = [
    new Product('Medium Coverage', 10, 20),
    new FullCoverage( 2, 0),
    new Product('Low Coverage', 5, 7),
    new MegaCoverage( 0, 80),
    new MegaCoverage( -1, 80),
    new SpecialFullCoverage( 15, 20),
    new SpecialFullCoverage( 10, 49),
    new SpecialFullCoverage( 5, 49),
    new SuperSale(3, 6),
  ];
  
  const carInsurance = new CarInsurance(productsAtDayZero);
  const productPrinter = function (product) {
    console.log(`${product.name}, ${product.sellIn}, ${product.price}`);
  };
  
  console.log(`OMGHAI!`);
  console.log(`Day 0`);
  console.log('name, sellIn, price');
  productsAtDayZero.forEach(productPrinter);
  console.log('');

  for (let i = 1; i <= 30; i += 1) {
    console.log(`Day ${i}`);
    console.log('name, sellIn, price');
    carInsurance.updatePrice().forEach(productPrinter);
    console.log('');
  }