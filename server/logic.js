let MNCList = [];
let BankList = [];

function MNC(name) {
  this.name = name;
  this.money = 10000;
  this.expenses = [];
  this.assets = [];
  this.stake = 100;

  this.payLoan = function() {
    this.expenses.forEach(currExpense => {
      this.money -= currExpense.emi;
      eval(`${currExpense.bank}`).money += currExpense.emi;
      currExpense.count--;
      if (currExpense.count == 0) {
        this.expenses.splice(this.expenses.indexOf(currExpense), 1);
      }
    });
  };

  this.addLoan = function(bankName, amount, cycle, interest) {
    var finalAmount = amount + amount * (interest / 100);
    this.expenses.push({
      bank: bankName,
      emi: finalAmount / cycle,
      count: cycle
    });
  };

  this.addAsset = function(basePrice, finalPrice, profit) {
    this.money -= finalPrice;
    this.asset.push({
      profit: profit,
      basePrice: basePrice
    });
  };

  this.getProfit = function() {
    this.expenses.forEach(currAsset => {
      this.money += currAsset.profit;
    });
  };

  this.sellStake = function(bank, amount, soldStake) {
    //todo: bank interaction
    bank.shares.push({
      MNC: this.name,
      shares: soldStake
    });
    bank.money -= amount;
    this.stake -= soldStake;
    this.money += amount;
  };

  this.evaluate = function() {
    var assetMoney;
    this.assets.forEach(currAsset => {
      assetMoney += currAsset.basePrice;
    });
    var finalEval = this.money * (this.stake / 100) + assetMoney;
    return finalEval;
  };
}

function Bank(name) {
  this.money = 10000;
  this.shares = [];
  this.name = name;

  this.evaluate = function() {
    var finalEval;
    this.shares.forEach(share => {
      finalEval += share.eval(`${MNC}`).money * (share.shares / 100);
    });
    finalEval += this.money;
    return finalEval;
  };
}

var cycle = () => {
  MNCList.forEach(currMNC => {
    eval(`${currMNC}`).payLoan();
    eval(`${currMNC}`).getProfit();
    eval(`${currMNC}`).evaluate();
  });

  BankList.forEach(currBank => {
    eval(`${currMNC}`).evaluate();
  });
};

module.exports = { cycle, Bank, MNC };
