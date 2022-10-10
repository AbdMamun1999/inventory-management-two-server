const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeletedProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
