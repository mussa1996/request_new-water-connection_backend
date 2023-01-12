import Branch from "../models/branch";
exports.create = async (req, res) => {
  try {
    const branch = new Branch({
      branch_code: req.body.branch_code,
      branch_name: req.body.branch_name,

    });

    const details = await branch.save();
    res.send({
      message: "branch saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getBranch = async (req, res) => {
  await Branch.find().then((pro) => {
    res.send({
      message: "branches found are:",
      pro,
    });
  });
};

exports.getOneBranch = async (req, res, next) => {
  try {
    const cust = await Branch.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "branch not found",
      });
    }
    res.send({
      message: "branch found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteBranch = async (req, res) => {
  try {
    const cust = await Branch.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "branch not found",
      });
    }

    await Branch.deleteOne({ _id: req.query.id });
    res.send({
      message: " branch deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateBranch = async (req, res) => {
  const branch = new Branch({
    _id: req.query.id,
      branch_name: req.body.branch_name,

  });

  Branch.updateOne({ _id: req.query.id }, branch)
    .then(() => {
      res.status(201).send({
        message: "branch updated successfully",
        branch,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

exports.countBranch = async (req,res) => {
  
  await Branch.find().count().then((data)=>{
    
    res.status(200).send({
      message: "branch found are:",
      data,
    });
  }
  ) 
}
exports.countBranchById = async(req, res) => {

  await Branch.find({
      _id: req.query.id
  }).count().then((data) => {

      res.status(200).send({
          message: "branch found are:",
          data,
      });
  })
}
