const Loan = require("./../models/loanModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");

exports.submitLoanApplication = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;
  const user = { user_id, ...req.body };
  const doc = await Loan.create(user);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.trackApplicationStatus = catchAsync(async (req, res, next) => {
  const docs = await Loan.find({ user_id: req.user._id });
  if (docs.length == 0) {
    return next(
      new AppError(
        "You haven't applied for any loan yet, Apply first to track.",
        400
      )
    );
  }

  const filtered_docs = docs.map((doc) => {
    return {
      loan_status: doc.loan_status
        ? doc.loan_status
        : "Application not yet verified by the agent",
      application_status: doc.application_status,
      id: doc._id,
    };
  });

  res.status(200).json({
    status: "success",
    data: {
      status: filtered_docs,
    },
  });
});

exports.getAllLoans = catchAsync(async (req, res, next) => {
  const loans = await Loan.find({});

  res.status(200).json({
    status: "success",
    data: {
      loans,
    },
  });
});

exports.editLoanDetails = catchAsync(async (req, res, next) => {
  const loan_id = req.params.loan_id;
  const loan = await Loan.findById(loan_id);
  if (!loan_id) {
    return next(
      new AppError("No Loan details found for the provided loan id", 400)
    );
  }
  if (loan.loan_status === "Approved") {
    return next(new AppError("Cannot edit the loan as it has been approved."));
  }

  if (req.body.application_status || req.body.loan_status) {
    return next(
      new AppError(
        "Cannot edit the loan status or application status through this link.",
        400
      )
    );
  }

  const doc = await Loan.findByIdAndUpdate(loan_id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.updateLoanApplicationStatus = catchAsync(async (req, res, next) => {
  const newArr = [];
  for (let property in req.body) {
    if (property === "application_status" || property === "loan_status") {
      newArr.push(`${property}: ${req.body[property]} `);
    }
  }

  if (newArr.length > 0) {
    if (req.user.role === "admin") {
      if (req.body.application_status)
        return next(new AppError("Admin can't edit Application", 400));
      let newDoc = await Loan.findByIdAndUpdate(
        req.params.loan_id,
        { loan_status: req.body.loan_status },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: newDoc,
      });
    } else {
      if (req.body.loan_status)
        return next(
          new AppError(
            "Agent can't approve or reject Loan, Only  Admin can",
            400
          )
        );
      let newDoc = await Loan.findByIdAndUpdate(
        req.params.loan_id,
        { application_status: req.body.application_status },
        {
          new: true,
          runValidators: true,
        }
      );

      if (req.body.application_status === "Approved") {
        await Loan.findByIdAndUpdate(
          req.params.loan_id,
          { loan_status: "New" },
          {
            new: true,
            runValidators: true,
          }
        );
      }

      res.status(200).json({
        status: "success",
        data: {
          data: newDoc,
        },
      });
    }
  } else {
    return next(
      new AppError(
        " Only application_status or loan_status can be edited through this link",
        400
      )
    );
  }
});
