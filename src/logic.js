function MNC(name) {
  this.name = name;
  this.money = 3000000;
  this.expenses = [];
  this.assets = [];
  this.stake = 100;
  this.vote = 0;
}

function Bank(name, number) {
  this.money = 7000000;
  this.shares = [];
  this.name = name;
  this.vote = 0;
  this.number = number;
}

module.exports = { Bank, MNC };
