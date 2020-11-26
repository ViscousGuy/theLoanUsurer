const mongoose = require("mongoose");
const validator = require("validator");

const loanSchema = new mongoose.Schema(
  {
    loan_type: {
      type: String,
      enum: {
        values: ["Personal", "Home", "Student"],
        message:
          "As of now we offer only loan on following types: Personal, Home and Student",
      },
      required: [true, "Please tell us the type of loan needed!"],
    },
    loan_amount: {
      type: Number,
      required: [true, "Please tell us the loan amount"],
      min: [10000, "Minimum Loan Amount: Rs.10,000 "],
      max: [50000000, "Maximum Loan Amount: Rs.5,00,00,000"],
    },
    secured: {
      type: Boolean,
      required: [
        true,
        "Please specify the loan security: Secured or Non-Secured",
      ],
    },
    loan_tenure: {
      type: Number,
      required: ["True", "Please tell us Loan Tenure"],
    },

    interest_rate: {
      type: Number,
      required: ["True", "Please tell us Interest Rate"],
    },
    total_payment: {
      type: Number,
    },
    loan_status: {
      type: String,
      enum: {
        values: ["New", "Approved", "Rejected"],
      },
    },
    application_status: {
      type: String,
      enum: {
        values: ["Pending", "Approved", "Rejected"],
      },
      default: "Pending",
    },
    application_date: {
      type: Date,
      default: Date.now(),
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Loan must belong to a User!"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

loanSchema.virtual("emi").get(function () {
  let r = this.interest_rate / 12 / 100;
  let p = this.loan_amount;
  let n = this.loan_tenure;
  return p * r * ((1 + r) ** n / ((1 + r) ** n - 1));
});

loanSchema.virtual("total_interest_payable").get(function () {
  let emi = this.emi;
  let p = this.loan_amount;
  let n = this.loan_tenure;
  return emi * n - p;
});
const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
