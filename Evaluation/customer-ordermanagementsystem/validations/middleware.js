const validateCustomer = (req, res, next) => {
  const { full_name, email, phone } = req.body;

  if (!full_name || !email || !phone) {
    return res.status(400).json({ error: "All customer fields are required" });
  }
  next();
};

const validateOrder = (req, res, next) => {
  const { product_name, quantity, price, customerId } = req.body;

  if (!product_name || !quantity || !price || !customerId) {
    return res.status(400).json({ error: "All order fields are required" });
  }
  next();
};

module.exports = { validateCustomer, validateOrder };
