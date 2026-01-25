const supabase = require("../supabaseClient.js");

exports.registerCustomer = async (req, res) => {
  try {
    const { full_name, email, phone } = req.body;
    const { data: existingCustomer, error: findError } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .single();

    if (existingCustomer) {
      return res.status(409).json({
        error: "Email already registered"
      });
    }
    const { data, error } = await supabase
      .from("customers")
      .insert([
        {
          full_name,
          email,
          phone
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    res.status(201).json({
      message: "Customer registered successfully",
      data
    });

  } catch (err) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
exports.deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const { data, error } = await supabase
      .from("customers")
      .delete()
      .eq("id", customerId)
      .select();

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: "Customer not found"
      });
    }
    res.json({
      message: "Customer deleted successfully. Related orders removed via cascade delete."
    });

  } catch (err) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
