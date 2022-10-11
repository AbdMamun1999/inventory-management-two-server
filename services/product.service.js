const Product = require("../models/Product");
const Brand = require("../models/Brands");

exports.getProductsService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
    console.log(products)
  const totalProducts = await Product.countDocuments(filters);
  const pageCount = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, pageCount, products };
};

exports.createServiecProduct = async (data) => {
  const product = await Product.create(data);
  // step : 1 -> id
  const { _id: productId, brand } = product;
  // update Brand
  const res = await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });
  console.log(res)
  return product;
};

exports.updateProductServiceById = async (productId, data) => {
  // kaj kortechen na
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    {
      runValidators: true,
    }
  );

  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  /* const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  }); */

  let products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  return result;
};

exports.deleteProductByIdService = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

exports.bulkDeletdProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};

exports.getProductByIdService = async (id) => {
  const result = await Product.findOne({ _id: id });
  console.log(result);
  return result;
};
