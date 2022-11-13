<template>
  <div id="app">
    <input
      type="text"
      v-model="password"
      @keyup.enter="checkPass()"
      placeholder="Admin Access"
      v-show="!admin"
    />
    <div class="Admin container" v-show="admin">
      <button class="btn btn-large btn-danger" @click="reHide()">ReHide</button>
      <div class="col-lg-12 my-5">
        <div class="card bg-secondary text-centre card-form">
          <div class="card-body">
            <h3>Add Bank and MNC</h3>
            <form>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="newMNC"
                  @keyup.enter="createMNC(newMNC)"
                  placeholder="MNC"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="newBank"
                  @keyup.enter="createBank(newBank)"
                  placeholder="Bank"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="card bg-danger text-centre card-form">
            <div class="card-body">
              <h3>Add Loan</h3>
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    v-model="newLoan.bank"
                    placeholder="Bank"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    v-model="newLoan.mnc"
                    placeholder="MNC"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control form-control-lg"
                    v-model.number="newLoan.amount"
                    placeholder="Amount (Mil)"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control form-control-lg"
                    v-model.number="newLoan.cycle"
                    placeholder="Cycles"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control form-control-lg"
                    v-model.number="newLoan.interest"
                    placeholder="Interest"
                    @keyup.enter="
                      addLoan(
                        newLoan.mnc,
                        newLoan.bank,
                        newLoan.amount,
                        newLoan.cycle,
                        newLoan.interest
                      )
                    "
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card bg-primary text-centre card-form">
            <div class="card-body">
              <h3>Add Asset</h3>
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    v-model="newAsset.mnc"
                    placeholder="AssetMNC"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    v-model.number="newAsset.bank"
                    placeholder="AssetBASE (Mil)"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    v-model.number="newAsset.finalPrice"
                    placeholder="AssetFINAL (Mil)"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    v-model.number="newAsset.profit"
                    placeholder="AssetPROFIT (Mil)"
                    class="form-control form-control-lg"
                    @keyup.enter="
                      addAsset(
                        newAsset.mnc,
                        newAsset.basePrice,
                        newAsset.finalPrice,
                        newAsset.profit
                      )
                    "
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card bg-warning text-centre card-form">
            <div class="card-body">
              <h3>Sell Shares</h3>
              <form>
                <div class="form-group">
                  <input
                    type="text"
                    v-model="newShareTransaction.mnc"
                    placeholder="MNC"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    v-model="newShareTransaction.bank"
                    placeholder="newShareBank"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    v-model.number="newShareTransaction.amount"
                    placeholder="newShareamount"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    v-model.number="newShareTransaction.soldStake"
                    placeholder="stake"
                    class="form-control form-control-lg"
                    @keyup.enter="
                      sellStake(
                        newShareTransaction.mnc,
                        newShareTransaction.bank,
                        newShareTransaction.amount,
                        newShareTransaction.soldStake
                      )
                    "
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <button @click="cycle()" class="btn btn-primary m-2 col-12">
          Cycle
        </button>
        <button @click="endGame()" class="btn btn-danger m-2 col-12">
          End Game
        </button>
        <button @click="compileResult()" class="btn btn-warning m-2 col-12">
          Compile Election Result
        </button>
        <button @click="clearResult()" class="btn btn-secondary m-2 col-2">
          Clear Result
        </button>
      </div>
      <div class="row m-2" style="display:flex;">
        <button @click="rulingParty = 1" class="btn btn-primary col-4">
          Elect Left Wing
        </button>
        <button @click="rulingParty = 2" class="btn btn-danger col-4">
          Elect Right Wing
        </button>
        <button @click="rulingParty = 3" class="btn btn-warning col-4">
          Elect Chicken Wing
        </button>
      </div>
    </div>
    <div class="common card m-5">
      <div class="card-body row">
        <ul class="col-6">
          <h3>MNCs</h3>
          <li v-for="(MNC, key) in mncList" :key="key">
            <span style="font-weight:900;">{{ MNC.name }}</span> {{ MNC.money }}
            <button class="btn btn-primary" @click="castVote(MNC, 1)">
              L
            </button>
            <button class="btn btn-danger" @click="castVote(MNC, 2)">R</button>
            <button class="btn btn-warning" @click="castVote(MNC, 3)">C</button>
            {{ MNC.vote }}
          </li>
        </ul>
        <ul class="col-6">
          <h3>BANKs</h3>
          <li v-for="(Bank, key) in bankList" :key="key">
            <span style="font-weight:900;">{{ Bank.name }}</span>
            {{ Bank.money }}
            <button class="btn btn-primary" @click="castVote(Bank, 1)">
              L
            </button>
            <button class="btn btn-danger" @click="castVote(Bank, 2)">R</button>
            <button class="btn btn-warning" @click="castVote(Bank, 3)">
              C
            </button>
            {{ Bank.vote }}
          </li>
        </ul>
        <ul class="col-12">
          <h3>Party standings</h3>
          <li>Left: {{ partyScore.left }}</li>
          <li>Right: {{ partyScore.right }}</li>
          <li>Chicken: {{ partyScore.chicken }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import logic from "./logic.js";
import _ from "lodash";

export default {
  name: "app",
  data() {
    return {
      password: "",
      admin: false,
      newMNC: "",
      newBank: "",
      mncList: [],
      bankList: [],
      // index: 0,
      newLoan: {
        bank: "",
        mnc: "",
        amount: "",
        cycle: "",
        interest: ""
      },
      newAsset: {
        mnc: "",
        basePrice: "",
        finalPrice: "",
        profit: ""
      },
      newShareTransaction: {
        mnc: "",
        bank: "",
        amount: "",
        soldStake: ""
      },
      rulingParty: "",
      partyScore: {
        left: 0,
        right: 0,
        chicken: 0
      }
      // mncVoterList: {},
      // bankVoterList: {}
    };
  },
  methods: {
    reHide: function() {
      this.admin = false;
    },
    checkPass: function() {
      var pass = "zenith";
      if (this.password == pass) {
        this.admin = true;
        this.password = "";
      } else {
        this.admin = false;
        this.password = "";
      }
    },
    checkVote: function(entity) {
      return entity.vote;
    },
    castVote: function(entity, newVote) {
      entity.vote = newVote;
    },
    createMNC: function(mncName) {
      this.mncList.push(new logic.MNC(mncName));
      this.newMNC = "";
    },
    deductedAmountMNC: function(MNC, amount) {
      if (MNC.vote != this.rulingParty) {
        var deductedAmount = (amount / 100) * 2;
        return amount - deductedAmount;
      } else {
        return amount;
      }
    },
    addAmountMNC: function(MNC, amount) {
      if (MNC.vote != this.rulingParty) {
        var deductedAmount = (amount / 100) * 2;
        return amount + deductedAmount;
      } else {
        return amount;
      }
    },
    deductAmountBank: function(Bank, amount) {
      if ((Bank.number % 3) + 1 != this.rulingParty) {
        var deductedAmount = (amount / 100) * 3;
        return amount - deductedAmount;
      } else {
        return amount;
      }
    },
    addAmountBank: function(Bank, amount) {
      if ((Bank.number % 3) + 1 != this.rulingParty) {
        var addedAmount = (amount / 100) * 3;
        return amount + addedAmount;
      } else {
        return amount;
      }
    },
    getMNC: function(names) {
      var ind = _.findIndex(this.mncList, function(o) {
        return o.name == names;
      });
      console.log(ind);
      return ind;
    },
    createBank: function(bankName) {
      this.bankList.push(new logic.Bank(bankName, this.bankList.length));
      this.newBank = "";
    },
    getBank: function(names) {
      var ind = _.findIndex(this.bankList, function(o) {
        return o.name == names;
      });
      console.log(ind);
      return ind;
    },

    // while getting the loan.
    addLoan: function(mnc, bank, amount, cycle, interest) {
      amount *= 1000000;
      var tempMNC = this.mncList[this.getMNC(mnc)];
      var tempBank = this.bankList[this.getBank(bank)];
      var finalAmount = amount * (interest / 100);
      finalAmount += amount;
      tempMNC.money += this.deductedAmountMNC(tempMNC, amount);
      tempBank.money -= amount;
      tempMNC.expenses.push({
        bank: tempBank.name,
        emi: finalAmount / cycle,
        count: cycle
      });
      this.newLoan.bank = "";
      this.newLoan.amount = "";
      this.newLoan.mnc = "";
      this.newLoan.cycle = "";
      this.newLoan.interest = "";
    },
    // while buying assets
    addAsset: function(mnc, basePrice, finalPrice, profit) {
      basePrice *= 1000000;
      finalPrice *= 1000000;
      profit *= 1000000;
      var tempMNC = this.mncList[this.getMNC(mnc)];
      tempMNC.money -= finalPrice;
      tempMNC.assets.push({
        profit: profit,
        basePrice: basePrice
      });
      this.newAsset.mnc = "";
      this.newAsset.basePrice = "";
      this.newAsset.finalPrice = "";
      this.newAsset.profit = "";
    },
    // when selling your shares to bank.
    sellStake: function(mnc, bank, amount, soldStake) {
      var tempMNC = this.mncList[this.getMNC(mnc)];
      var tempBank = this.bankList[this.getBank(bank)];
      tempBank.shares.push({
        MNC: tempMNC.name,
        shares: soldStake
      });
      tempMNC.stake -= soldStake;
      tempBank.money -= this.addAmountBank(tempBank, amount);
      tempMNC.money += this.deductedAmountMNC(tempMNC, amount);
      this.newShareTransaction.mnc = "";
      this.newShareTransaction.bank = "";
      this.newShareTransaction.amount = "";
      this.newShareTransaction.soldStake = "";
    },
    //To get profit on the assets.
    getProfit: function(mnc) {
      var tempMNC = this.mncList[this.getMNC(mnc)];
      console.log("hi");

      tempMNC.assets.forEach(currAsset => {
        console.log(tempMNC.money);

        tempMNC.money += currAsset.profit;
      });
    },
    //while paying EMI
    payLoan: function(mnc) {
      var tempMNC = this.mncList[this.getMNC(mnc)];
      tempMNC.expenses.forEach(loan => {
        if (loan.count == 0) {
          tempMNC.expenses.splice(tempMNC.expenses.indexOf(loan), 1);
        }
        // console.log(this);
        tempMNC.money -= this.addAmountMNC(tempMNC, loan.emi);
        var tempBank = this.bankList[this.getBank(loan.bank)];
        console.log(tempBank);

        tempBank.money += this.deductAmountBank(tempBank, loan.emi);
        loan.count--;
        console;
        if (loan.count == 0) {
          tempMNC.expenses.splice(tempMNC.expenses.indexOf(loan), 1);
        }
      });
    },

    evalMNC: function(mnc) {
      var assetMoney = 0;
      var tempMNC = this.mncList[this.getMNC(mnc)];
      tempMNC.assets.forEach(currAsset => {
        assetMoney += currAsset.basePrice;
      });
      tempMNC.assets = [];
      tempMNC.expenses = [];
      var finalEval = tempMNC.money * (tempMNC.stake / 100) + assetMoney;
      console.log(finalEval, "mnc");
      tempMNC.money = finalEval;

      return finalEval;
    },
    evalBank: function(bank) {
      var finalEval = 0;
      var tempBank = this.bankList[this.getBank(bank)];
      tempBank.shares.forEach(share => {
        var tempMNC = this.mncList[this.getMNC(share.MNC)];
        finalEval += tempMNC.money * (share.shares / 100);
      });
      tempBank.shares = [];
      finalEval += tempBank.money;
      console.log(finalEval, "bank");
      tempBank.money = finalEval;

      return finalEval;
    },
    endGame: function() {
      this.mncList.forEach(MNC => {
        this.evalMNC(MNC.name);
      });
      this.bankList.forEach(Bank => {
        this.evalBank(Bank.name);
      });
    },
    clearResult: function() {
      this.partyScore.left = 0;
      this.partyScore.right = 0;
      this.partyScore.chicken = 0;
    },
    compileResult: function() {
      this.mncList.forEach(MNC => {
        if (MNC.vote == 1) {
          this.partyScore.left++;
        } else if (MNC.vote == 2) {
          this.partyScore.right++;
        } else if (MNC.vote == 3) {
          this.partyScore.chicken++;
        }
      });
      this.bankList.forEach(bank => {
        if (bank.vote == 1) {
          this.partyScore.left++;
        } else if (bank.vote == 2) {
          this.partyScore.right++;
        } else if (bank.vote == 3) {
          this.partyScore.chicken++;
        }
      });
    },
    cycle: function() {
      this.mncList.forEach(MNC => {
        this.payLoan(MNC.name);
        console.log(MNC.name);

        this.getProfit(MNC.name);
      });
      this.bankList.forEach(Bank => {});
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: decimal;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
a {
  color: #42b983;
}
</style>
