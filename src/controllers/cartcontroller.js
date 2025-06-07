const { Int32 } = require("mongodb");
const { get } = require("../../db/mongo");

const bodyParser = require("body-parser");

const checkProductInCart = async (productId) => {
  try {
    //console.log("Fetching all products...");
    // const productId = parseInt(req.query.productId);
    //console.log(" checkProductInCart productId :", productId);

    const db = get();
    const cartItems = await db
      .collection("cartItems")
      .findOne({ productId: productId });
    //console.log("Products fetched successfully:", productsDisplay);
    //console.log("cart items :", cartItems);

    return cartItems;
    //res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    //res.status(500).json({ message: "Internal server error" });
  }
};

const addOrUpdateToCart = async (req, res) => {
  //console.log(" &&&&&&&&&&& ");
  const product = req.body;

  const db = get();
  const cartItem = await checkProductInCart(product.productId);

  if (!cartItem) {
    const cart = await db.collection("cartItems").insertOne(product);
    res.status(201).json({ msg: "Item added to cart successfully" });
  } else {
    //const { productId, qty } = req.body;
    //console.log(" product id :", productId, " ", "qty :", qty);

    const db = get();
    const cart = await db
      .collection("cartItems")
      .updateOne(
        { productId: product.productId },
        { $set: { qty: product.qty } }
      );

    res.status(201).json({ msg: "Item updated to cart successfully" });
  }

  //const cart = await db.collection("cartItems").insertOne(product);
};

const getCartItems = async (req, res) => {
  try {
    //console.log("Fetching all products...");
    const db = get();
    const cartItems = await db.collection("cartItems").find({}).toArray();
    //console.log("Products fetched successfully:", productsDisplay);

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  const productId = parseInt(req.params.productId);

  const db = get();

  const cart = await db
    .collection("cartItems")
    .deleteOne({ productId: productId });

  res.status(200).json({ msg: "Item deleted from cart successfully" });
};

module.exports = {
  addOrUpdateToCart,
  getCartItems,

  removeFromCart,
};
