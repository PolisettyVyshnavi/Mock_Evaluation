exports.addOrder = async (req, res) => {
  try {
    const { product_name, quantity, price, customerId } = req.body;

    const { data: customer, error: custError } = await supabase
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

    res.status(201).json({
      message: "Order added successfully",
      data
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
