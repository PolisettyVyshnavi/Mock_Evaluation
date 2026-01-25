const {createClient} =require('@supabase/supabase-js')
const supabase=createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) 

exports.addOrder=async (req,res)=>{
    const {product_name,quantity,price,customerId}=req.body;
    const {data,error}=await
    supabase.from('orders').insert ([product_name,quantity,price,customerId]).select();
    if(error)
    res.status(201).json(data[0])
}

exports.getOrdersByCustomer=async (req,res)=>{
    const {data,error}=await
    supabase.from('orders').select('*').eq('customer_id',req.params.customerId);
    if(error)
    res.status(500).json({error:error.message})
    if(!data.length) return res.status(404).json({error:"No orders found for this customer"});
    res.json(data[0])
}

exports.updateOrders=async (req,res)=>{
    const {data,error}=await
    supabase.from('orders').update(req.body).eq('id',req.params.orderId).select();
    if(error || !data.length) 
    return res.status(404).json({error:"Orders not found"});
    res.json(data[0])
}

exports.deleteCustomer=async (req,res)=>{
    const {error} = await 
    supabase.from('orders').delete().eq('id',req.params.orderId)
    if (error) return res.status(500).ison({error:error.message})
        res.json({message:"Orders deleted successfully"});
}