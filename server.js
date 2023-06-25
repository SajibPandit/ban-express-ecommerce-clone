const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51IInAvADndIDpsFDNnsSCEm8hxYjJtmKLOHZCrnEhP94lARwoE7ZBiS51soSKXVmc4ZvyctGf5MlyxuFkTn8K7fH00XbCf85SZ')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Welcome to React Online Shop Website')
})

app.post('/checkout',async(req,res)=>{
    let error 
    let status
    try {
        const {product,token} = req.body
        const coustomer = await stripe.customers.create({
            email:token.email,
            source : token.id
        })
        const key = uuidv4()
        const charge = await stripe.charges.create({
            amount : product.price*100,
            currency : 'usd',
            customer : coustomer.id,
            receipt_email : token.email,
            description:'All Products Description',
            shipping:{
                name: token.card.name,
                address:{
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    coustomer: token.card.address_coustomer,
                    postal_code: token.card.address_zip
                }
            }

        },{idempotencyKey:key})
        status = 'success'
    } catch (error) {
        console.log(error)
        status = 'error'
    }
    res.json({status})
})

app.listen(8000,()=>{
    console.log('Your App is running on port 8000')
})
