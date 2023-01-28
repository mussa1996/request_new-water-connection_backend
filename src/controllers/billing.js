import Billing from "../models/billing";
exports.create = async (req, res) => {
  try {
    const billing = new Billing({
      item_description: req.body.item_description,
      quantity: req.body.quantity,
      unit_price: req.body.unit_price,
      item_man: req.body.item_man,
      quantity_man: req.body.quantity_man,
      unit_price_man: req.body.unit_price_man,
      total_price_man: req.body.quantity_man * req.body.unit_price_man,
      totalI:req.body.total_price,
      total_price:req.body.quantity * req.body.unit_price,
      totalIII: req.body.totalIII,
      vat: req.body.vat,
      total_all:req.body.total_all,
      approved_by: req.body.approved_by,
      verified_by: req.body.verified_by,
      prepared_by: req.body.prepared_by,
      request_id:req.body.request_id,
    });

    const details = await billing.save();
    res.send({ 
      message: "Billing request saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getBilling = async (req, res) => {
  await Billing.find().then((pro) => {
    res.send({
      message: " Billing found are:",
      pro,
    });
  });
};

exports.getOneBilling = async (req, res, next) => {
  try {
    const cust = await Billing.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "Billing not found",
      });
    }
    res.send({
      message: "Billing found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteBilling = async (req, res) => {
  try {
    const cust = await Billing.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "Billing not found",
      });
    }

    await Billing.deleteOne({ _id: req.query.id });
    res.send({
      message: " Billing deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateBilling = async (req, res) => {
  const billing = new Billing({
    _id: req.query.id,
    item_description: req.body.item_description,
      quantity: req.body.quantity,
      unit_price: req.body.unit_price,
      item_man: req.body.item_man,
      quantity_man: req.body.quantity_man,
      unit_price_man: req.body.unit_price_man,
      total_price_man:totalPriceMan,
      totalI:totalI,
      total_price: totalPrice,
      totalIII:totalIII,
      vat:vat,
      total_all:totalAll,
      approved_by: req.body.approved_by,
      verified_by: req.body.verified_by,
      prepared_by: req.body.prepared_by,
     

  });

  Billing.updateOne({ _id: req.query.id }, billing)
    .then(() => {
      res.status(201).send({
        message: "Billing updated successfully",
        billing,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

exports.countBilling = async (req,res) => {
  
  await Billing.find().count().then((data)=>{
    
    res.status(200).send({
      message: "billing found are:",
      data,
    });
  }
  ) 
}
exports.countBillingById = async(req, res) => {

  await Billing.find({
      _id: req.query.id
  }).count().then((data) => {

      res.status(200).send({
          message: "Billing found are:",
          data,
      });
  })
}
exports.getBillingById = async (req, res) => {
  
  await Billing.find({
      request_id: req.query.request_id
  }).populate("request_id", "name")
  .then((form) => {
    form.map((form) => {
      form._doc.id=form._id;
      delete form._doc._id;
      })
     
    res.send({
      message: "Billing found are:",
      form,
    }); 
  });
};
exports.CountBillingByRequestId = async(req, res) => {

  await Billing.find({
    request_id: req.query.request_id
}).count().then((data) => {
 
      res.status(200).send({
          message: "Billing found are:",
          data,
      });
  })
}

//calculate total price
const totalPrice = async (req, res) => {
  const total = req.body.quantity * req.body.unit_price;
  res.send({
    message: "Total price is:",
    total,
  });
}
//calculate total price man
const totalPriceMan = async (req, res) => {
  const total = req.body.quantity_man * req.body.unit_price_man;
  res.send({
    message: "Total price is:",
    total,
  });
}
//calculate sum of many total price using loop
const totalI = async (req, res) => {
  const totalI = req.body.total_price.reduce((a, b) => a + b, 0);
  res.send({
    message: "Total I is:",
    totalI,
  });
}
//calculate total III
const totalIII = async (req, res) => {
  const totalIII= req.body.total_price_man.reduce((a, b) => a + b, 0);
  res.send({
    message: "Total III is:",
    totalIII,
  });
}
//calculate total all
const totalAll = async (req, res) => {
  const totalAll =  req.body.totalI + req.body.totalIII+ req.body.vat;
  res.send({
    message: "Total all is:",
    totalAll,
  });
}
//calculate vat for 18%
const vat = async (req, res) => {
  const vat = (req.body.totalI+ req.body.totalIII) * 0.18;
  res.send({
    message: "Vat is:",
    vat,
  });
}
//calculate sum of many total price using loop without using reduce
const totalI1 = async (req, res) => {
  let totalII = 0;
  for (let i = 0; i < req.body.total_price.length; i++) {
    totalII += req.body.total_price[i];
  }
  res.send({
    message: "Total I is:",
    totalII,
  });
}

const totalI3 = async (req, res) => {
  let totalII = 0;
  for (let i = 0; i < req.body.total_price_man.length; i++) {
    totalII += req.body.total_price_man[i];
  }
  res.send({
    message: "Total III is:",
    totalII,
  });
}

