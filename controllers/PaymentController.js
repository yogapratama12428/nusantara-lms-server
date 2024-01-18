
import crypto from 'crypto'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPayment = async (req, res) => {
    const { order_id, transaction_status, signature_key, gross_amount, status_code } = req.body

    const{ MIDTRANS_SERVERKEY_DEV } = process.env  

        const hash = crypto.createHash('sha512').update(order_id + status_code + gross_amount + MIDTRANS_SERVERKEY_DEV).digest('hex')

        if (signature_key !== hash )  return res.status(401).json({'error': 'signature mismatch'})

        const getOrderId = await prisma.cart.findFirst({
            where: {
                orderId: order_id
            }
        })

        if (!getOrderId) return res.status(401).json({'no success': 'we not found your order id'})

        await prisma.purchase.create({
            data: {
                userId,
                courseId: getOrderId.courseId
            }
        })

        await prisma.cart.updateMany({
            where: {
                order_id
            },
            data: {
                isPaid: true,
            }
        })

        res.status(201).json({'success': 'Purchase added successfully'})
   
} 