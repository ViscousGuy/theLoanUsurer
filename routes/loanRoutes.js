const express = require("express");
const loanController = require("./../controllers/loanController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post(
  "/apply",
  authController.restrictTo("customer"),
  loanController.submitLoanApplication
);

router.get(
  "/track",
  authController.restrictTo("customer"),
  loanController.trackApplicationStatus
);

router.get(
  "/",
  authController.restrictTo("admin", "agent"),
  loanController.getAllLoans
);

router.patch(
  "/:loan_id/action",
  authController.restrictTo("admin", "agent"),
  loanController.updateLoanApplicationStatus
);

router.patch(
  "/:loan_id",
  authController.restrictTo("agent"),
  loanController.editLoanDetails
);

module.exports = router;
