import midtransClient from 'midtrans-client'

export const createPayment = async (req, res) => {
    const { purchaseId, userId, courseId, price } = req.body

    const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SB-Mid-server-8Uv86mrCeuWYpzKE_61ml4aq",
        clientKey: "SB-Mid-client-BvrFjmMrzRtY5KLw",
    })  

    const payload = {
        "transaction_details": {
            "order_id": purchaseId,
            "gross_amount": price
        }, "credit_card":{
            "secure" : true
        },
        "callbacks": {
            "finish": `https://tokoecommerce.com/my_custom_finish/?userid=${userId}&courses=${courseId}`
        }
    }
    
    snap.createTransaction(payload)
    .then((transaction)=>{
        // transaction token
        let transactionToken = transaction.token;
        console.log('transactionToken:',transactionToken);

        // transaction redirect url
        let transactionRedirectUrl = transaction.redirect_url;
        console.log('transactionRedirectUrl:',transactionRedirectUrl);

        return res.status(200).json({transactionToken, transactionRedirectUrl})
    })
    .catch((e)=>{
        console.log('Error occured:',e.message);
        return res.status(401).json(e)
    });
} 