const supabase = require("../supabaseClient.js");

exports.addOrder = async (req, res) => {
  try {
    const { product_name, quantity, price, customerId } = req.body;

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
      .insert([{ product_name, quantity, price, customer_id: customerId }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Order added successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getMyOrders = async (req, res) => {
  try {
    const { customerId } = req.params;

    const { data: customer } = await supabase
      .from("customers")
      .select("id")
      .eq("id", customerId)
      .single();

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_id", customerId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { quantity, price, order_status } = req.body;

    const { data, error } = await supabase
      .from("orders")
      .update({ quantity, price, order_status })
      .eq("id", orderId)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0)
      return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order updated successfully", data });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const { data, error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0)
      return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

