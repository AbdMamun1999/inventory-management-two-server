const {
  getProductsService,
  createServiecProduct,
  updateProductServiceById,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeletdProductService,
  getProductByIdService,
} = require("../services/Product.service");

exports.getProducts = async (req, res, next) => {
  try {
    /* const product = await Product.find({})
            .where("name").equals(/\w/)
            .where('quantity').gt(100)
            .lt(600)
            .limit(2)
            .sort({ quantity: -1 }); */
    let filters = { ...req.query };

    // sort,page,limit, -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // gt, lt,gte,lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price,quantity -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      // 50 products
      // each page 10 product
      // page 1 -> 1-10 , 2 -> 11-20, 3 -> 21-30,4 -> 31-40 , 5 -> 41-50
      const skip = (page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const product = await getProductsService(filters, queries);

    res.send(product);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createServiecProduct(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfull",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    res.send("get PRoduct");
  } catch (error) {
    res.send("error");
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully updated the products",
    });
  } catch (error) {
    res.status(200).send({
      status: false,
      message: "Product update failed.Something went wrong,bulk-update",
      data: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductServiceById(id, req.body);
    res.status(200).send({
      status: true,
      message: "Product update successful",
      data: result,
    });
  } catch (error) {
    res.status(200).send({
      status: false,
      message: "Product update failed.Something went wrong,product id",
      data: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existProduct = await getProductByIdService(id);
    if (existProduct) {
      const result = await deleteProductByIdService(id);

      if (!result.deletedCount) {
        res.status(400).send({
          status: false,
          message: "Could not delete given product",
          data: error.message,
        });
      }
      res.status(200).send({
        status: true,
        message: "Successfully delete the product ",
        data: result,
      });
    } else {
      res.status(400).send({
        status: false,
        message: "Could not find given product",
      });
    }
  } catch (error) {
    res.status(200).send({
      status: false,
      message: "Could not delete the product",
      data: error.message,
    });
  }
};

exports.bulkDeletedProduct = async (req, res, next) => {
  try {
    const result = await bulkDeletdProductService(req.body.ids);

    if (!result.deletedCount) {
      res.status(400).send({
        status: false,
        message: "Could not delete given products",
        data: error.message,
      });
    }

    res.status(200).send({
      status: true,
      message: "Successfully delete given products ",
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Could not delete given products",
      data: error.message,
    });
  }
};
