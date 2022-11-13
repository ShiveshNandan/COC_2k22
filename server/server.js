var express = require("express");
var bodyParser = require("body-parser");

var COC = require("./logic");

var app = express();

app.use(bodyParser.json());

let MNCList = [];
let BankList = [];

//TODO: Make response objects frontend framework friendly(JSON)

//Test: All tests remaining.

app.post("/addMNCs", (req, res) => {
  req.body.teamList.forEach(newMNC => {
    eval(`global.${newMNC} = new COC.MNC('${newMNC}')`);
    console.log(eval(`${newMNC}`).name);
    MNCList.push(`${newMNC}`);
    console.log(mnc1.money);
    console.log(MNCList);
  });

  res.send("Done");
});

app.post("/addBanks", (req, res) => {
  try {
    req.body.teamList.forEach(newBank => {
      eval(`global.${newBank} = new COC.Bank('${newBank}')`);
      BankList.push(`${newBank}`);
    });
  } catch (e) {
    res.send(e);
  }
  res.send("Done");
});

app.get("/cycle", (req, res) => {
  COC.cycle();
  res.send("Done");
});

app.post("/addLoans", (req, res) => {
  req.body.loanList.forEach(loan => {
    eval(
      `${loan.mnc}
        .addLoan(
          ${loan.bankName},
          ${loan.amount},
          ${loan.cycle},
          ${loan.interest}
        )`
    );
  });
});

app.post("/addAsset", (req, res) => {
  req.body.assetList.forEach(asset => {
    eval(
      `${asset.MNC}
        .addAsset(
          ${asset.basePrice},
          ${asset.finalPrice},
          ${asset.profit}
        )`
    );
  });
  res.send("Done");
});

app.post("/sellStake", (req, res) => {
  req.body.stakeList.forEach(stake => {
    eval(
      `${stake.MNC}
        .sellStake(
          ${stake.bank},
          ${stake.amount},
          ${stake.soldStake}
        )`
    );
  });
  res.send("Done");
});

app.get("/refresh", (req, res) => {
  server.close(() => {
    global.server = app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  });
  res.send("YESS");
});

global.server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// DEBUG=express:* node server.js
