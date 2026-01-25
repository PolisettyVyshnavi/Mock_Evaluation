const supabase = require("../supabaseClient.js");

/**
 * Register a new customer
 * POST /api/register
 */
exports.registerCustomer = async (req, res) => {
  try {
    const { full_name, email, phone } = req.body;

    // Check for duplicate email
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

    // Insert new customer
    const { data, error } = await supabase
      .from("customers")
      .insert([
        {
          full_name,
          email,
          phone
        }
      ])
      .select(); // return inserted row

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

/**
 * Delete a customer (CASCADE DELETE orders)
 * DELETE /api/delete-customer/:customerId
 */
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

    // Orders will be deleted automatically (ON DELETE CASCADE)
    res.json({
      message: "Customer deleted successfully. Related orders removed via cascade delete."
    });

  } catch (err) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
