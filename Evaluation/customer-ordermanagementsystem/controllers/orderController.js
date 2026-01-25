const supabase = require("../supabaseClient");

exports.addOrder = async (req, res) => {
  const { product_name, quantity, price, customerId } = req.body;

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("id", customerId)
    .single();

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  const { data, error } = await supabase.from("orders").insert([
    {
      product_name,
      quantity,
      price,
      customer_id: customerId
    }
  ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: "Order added", data });
};

exports.getMyOrders = async (req, res) => {
  const { customerId } = req.params;

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("id", customerId)
    .single();

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { quantity, price, order_status } = req.body;

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  const { data, error } = await supabase
    .from("orders")
    .update({ quantity, price, order_status })
    .eq("id", orderId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Order updated", data });
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    return res.status(400).json({ error: "Invalid order ID" });
  }

  res.json({ message: "Order deleted" });
};
