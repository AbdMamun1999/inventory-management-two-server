const Stock = require("../models/Stock");

exports.getStocksService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const totalStocks = await Stock.countDocuments(filters);
  const pageCount = Math.ceil(totalStocks / queries.limit);
  return { totalStocks, pageCount, stocks };
};

exports.createcStockServie = async (data) => {
  const product = await Stock.create(data);
  
  return product;
};

// exports.updateStockByIdService = async (productId, data) => {
//   // kaj kortechen na
//   const result = await Product.updateOne(
//     { _id: productId },
//     { $set: data },
//     {
//       runValidators: true,
//     }
//   );

//   // const product = await Product.findById(productId);
//   // const result = await product.set(data).save();
//   return result;
// };

// /* exports.bulkUpdateStockService = async (data) => {
//   let products = [];
//   data.ids.forEach((product) => {
//     products.push(Product.updateOne({ _id: product.id }, product.data));
//   });

//   const result = await Promise.all(products);
//   return result;
// }; */

// exports.deleteStockByIdService = async (productId) => {
//   const result = await Product.deleteOne({ _id: productId });
//   return result;
// };

// /* exports.bulkDeletdStockService = async (ids) => {
//   const result = await Product.deleteMany({ _id: ids });
//   return result;
// }; */

// exports.getStockByIdService = async (id) => {
//   const result = await Product.findOne({ _id: id });
//   console.log(result);
//   return result;
// };
