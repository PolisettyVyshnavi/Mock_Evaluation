const supabase = require("../supabaseClient");

exports.registerCustomer = async (req, res) => {
  const { full_name, email, phone } = req.body;

  // Check duplicate email
  const { data: existing } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email)
    .single();

  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const { data, error } = await supabase.from("customers").insert([
    { full_name, email, phone }
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Customer registered successfully", data });
};

exports.deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", customerId);

  if (error) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  res.json({ message: "Customer and related orders deleted (cascade)" });
};
