const express = require("express");
const stockController = require('../controllers/stock.controller')

const router = express.Router();

/* router.route("/bulk-update").patch(stockController.bulkUpdateStock);
router.route("/bulk-delete").delete(stockController.bulkDeletedStock); */

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);


/* router
  .route("/:id")
  .get(stockController.getStockById)
  .patch(stockController.updateStockById)
  .delete(stockController.deleteStockById); */

module.exports = router;

console.log(router)
