const {createClient} =require('@supabase/supabase-js')
const supabase=createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY) 
exports.registerCustomer=async (req,res)=>{
    const {data,error}=await
    supabase.from('customers').insert ([req.body]).select();
    if(error){
        if(error.code==="23505") return
    res.status(409).json({error:"Email already registered"})
        return res.status(500).json({error:error.message})
    }
res.status(201).json(data[0])
}

exports.deleteCustomer=async (req,res)=>{
    const {error} = await 
    supabase.from('customers').delete().eq('id',customerId)
    if (error) return res.status(500).ison({error:error.message})
        res.json({message:"Customer and all associated orders deleted"})
}