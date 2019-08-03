/**
 *  Normal Product
 *  Update the price by decreasing by one when sellIn >= 0 or by 2 when sellIn < 0.
 *  If the calculated new price is negative then we set it to 0.
 */
class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }

  /**
   * Function thats update his price and decrease days of sell in a product (in that order).
   */
  afterOneDay(){
    this.updatePrice();
    this.decreaseSellIn();
  }

  /**
   * Decrease the number of days we have to sell the product
   */
  decreaseSellIn(){
    this.sellIn = this.sellIn - 1;
  }

  /**
   * Update the price by decreasing by one when sellIn >= 0 or by 2 when sellIn < 0.
   * If the calculated new price is negative then we set it to 0.
   */
  updatePrice(){
    //At the end of each day the system lowers price by 1.
    var amount = 1;
    // Once the sell by date has passed, price degrades twice as fast.
    if(this.sellIn <= 0 ){
      amount = 2;
    }
    var newPrice = this.price - amount;
    //The price of a product is never negative.
    newPrice = this.checkNegative(newPrice);

    this.price = newPrice;
  }

  checkNegative(newPrice){
    if ( newPrice < 0 )
      return 0;
    return newPrice;
  }
}

/**
 *  Super Sale Product extends from Product class
 *  Update the price by decreasing by one when sellIn >= 0 or by 2 when sellIn < 0.
 *  If the calculated new price is negative then we set it to 0.
 */
class SuperSale extends Product {

  constructor(sellIn, price){
    super('Super Sale',sellIn,price);
  }

  /**
   * Update the price by decreasing by 2 when sellIn >= 0 or by 4 when sellIn < 0.
   * If the calculated new price is negative then we set it to 0.
   */
  updatePrice(){
    //At the end of each day the system lowers price by 1.
    var amount = 2;
    // Once the sell by date has passed, price degrades twice as fast.
    if(this.sellIn <= 0 ){
      amount = 4;
    }
    var newPrice = this.price - amount;
    //The price of a product is never negative.
    newPrice = this.checkNegative(newPrice);

    this.price = newPrice;
  }
}

/**
 *  Full Coverage  extends from Product class
 *  Increases in price the older it gets.
 */
class FullCoverage extends Product {

  constructor(sellIn, price){
    super('Full Coverage',sellIn,price);
  }

  /**
   * Update the price by decreasing by 2 when sellIn >= 0 or by 4 when sellIn < 0.
   * If the calculated new price is negative then we set it to 0.
   */
  updatePrice(){
    //At the end of each day the system lowers price by 1.
    var amount = 1;
    // Once the sell by date has passed, price degrades twice as fast.
    if(this.sellIn <= 0 ){
      amount = 2;
    }
    var newPrice = this.price + amount;

    //The price of a product is never more than 50.
    if( newPrice > 50){
      newPrice = 50;
    }

    //The price of a product is never negative
    newPrice = this.checkNegative(newPrice);

    this.price = newPrice;
  }
}

/**
 *  Mega Coverage extends from Product class
 *  Id a legendary product, never has to be sold or decreases in price.
 */
class MegaCoverage extends Product {

  constructor(sellIn, price){
    super('Mega Coverage',sellIn,price);
  }

  /**
   * "Mega Coverage", being a legendary product, never has to be sold or decreases in price.
   */
  afterOneDay(){}
}

/**
 * "Special Full Coverage" extends from Product class
 *  
 *  Like full coverage, increases in price as its sellIn value approaches:
 *
 *  price increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but.
 *  price drops to 0 when no more days left (and the product is not valid anymore).
 *
 */
class SpecialFullCoverage extends Product {

  constructor(sellIn, price){
    super('Special Full Coverage',sellIn,price);
  }

  /**
   *    price increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but.
   *    price drops to 0 when no more days left (and the product is not valid anymore).
   *
   */
  updatePrice(){

    // price drops to 0 when no more days left (and the product is not valid anymore).
    if(this.sellIn <= 0 ){
      this.price = 0;
      return;
    }

    //At the end of each day the system lowers price by 1.
    var amount = 1;
    if(this.sellIn <= 5 ){
      amount = 3;
    }else if(this.sellIn <= 10 ){
      amount = 2;
    }

    var newPrice = this.price + amount;
    //The price of a product is never negative.
    newPrice = this.checkNegative(newPrice);    

    //The price of a product is never more than 50.
    if( newPrice > 50){
      newPrice = 50;
    }

    this.price = newPrice;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    for (var i = 0; i < this.products.length; i++) {
      this.products[i].afterOneDay();
    }

    return this.products;
  }
}

module.exports = {
  SuperSale,
  FullCoverage,
  MegaCoverage,
  SpecialFullCoverage,
  Product,
  CarInsurance
}
