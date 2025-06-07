const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartcontroller");

router.get("/cart/items", cartController.getCartItems);
router.post("/cart", cartController.addOrUpdateToCart); // add/update
router.delete("/cart/:productId", cartController.removeFromCart);

//export default router;
module.exports = router;
