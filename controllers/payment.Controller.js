require("dotenv").config();
const axios = require("axios");
const globals = require("node-global-storage");
const payment = require("../models/payment.Model");
const { v4: uuidv4, v4 } = require("uuid");
const createHttpError = require("http-errors");

//request headers

const bkash_headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: globals.getValue("id_token"),
    "x-app-key": process.env.bkash_api_key,
  };
};

const callback = async (req, res, next) => {
  const { paymentID, status } = req.query;

  if (status === "cancel" || status === "failure") {
    return res.json({status, message: "Payment Failed"});
  }

  if (status === "success") {
    try {
      const { data } = await axios.post(
        process.env.bkash_execute_payment_url,
        {
          paymentID,
        },
        {
          headers: bkash_headers(),
        }
      );

      if(data && data.statusCode === '0000') {
        await payment.create({
            userID: v4(),
            paymentID,
            trxID: data.trxID,
            date: data.paymentExecuteTime,
            amount: parseInt(data.amount),
        });

        return res.status(200).json({message: "Payment success"});
      } else {
        return res.json({message: data.statusMessage});
      }
    } catch (error) {
        next(createHttpError(500, error.message));
    }
  }
};

const createOrder = async (req, res, next) => {
    // res.send("Ok Bhai ok");
  const { amount } = req.body;
  try {
    const { data } = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: `http://localhost:${process.env.PORT}/api/payment/bkash/callback`,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
      },
      {
        headers: bkash_headers(),
      }
    );
    return res.status(200).json({
      bkashURL: data.bkashURL,
    });
  } catch (error) {
    console.log("Jhamel")
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, callback };
