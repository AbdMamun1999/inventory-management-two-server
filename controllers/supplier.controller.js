const {
  createSupplierService,
  getAllSupplierService,
  getSupplierByIdService,
  updateSupplierService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully created the supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Could'n create the supplier",
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getAllSupplierService();

    res.status(200).json({
      status: "Success",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Could'n get the supplier.Something went wrong",
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await getSupplierByIdService(id);

    if (!supplier) {
      res.status(400).json({
        status: "fail",
        error: "Could'n find a supplier with this id",
      });
    }

    res.status(200).json({
      status: "Success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Could'n get the supplier details.Something went wrong",
    });
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierService(id, req.body);

    if (!result.modifiedCount) {
      res.status(400).json({
        status: "fail",
        error: "Could'n could not update the supplier with this id",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully updated the supplier",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the supplier.Something went wrong",
    });
  }
};
