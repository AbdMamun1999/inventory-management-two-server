const {
  createBrandService,
  getAllBrandService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully created the data",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Could'n create the brand",
    });
  }
};

exports.getAllBrand = async (req, res, next) => {
  try {
    const brands = await getAllBrandService();

    res.status(200).json({
      status: "Success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Could'n get the brand.Something went wrong",
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);

    if (!brand) {
      res.status(400).json({
        status: "fail",
        error: "Could'n find a brand with this id",
      });
    }

    res.status(200).json({
      status: "Success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Could'n get the brand details.Something went wrong",
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandService(id, req.body);

    if (!result.modifiedCount) {
      res.status(400).json({
        status: "fail",
        error: "Could'n could not update the brand with this id",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully updated the brand",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the brand.Something went wrong",
    });
  }
};
