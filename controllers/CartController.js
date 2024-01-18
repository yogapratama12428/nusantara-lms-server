import express from "express";
import { PrismaClient } from "@prisma/client";
import midtransClient from 'midtrans-client'

const prisma = new PrismaClient();

export const getCart = async (req, res) => {
    try {
        const response = await prisma.cart.findMany({})
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: 'Not Found' })
    }
}

export const getCartById = async (req, res) => {
    const {  id } = req.params
    try {
        const response = await prisma.cart.findMany({
            where: {
                userId: id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: 'Not Found' })
    }
}

export const createCart = async (req, res) => {
    const { userId, courseId, imageUrl, title } = req.body 

    const{ MIDTRANS_SERVERKEY_DEV, MIDTRANS_CLIENTKEY_DEV } = process.env  

    const getCourse = await prisma.course.findUnique({
        where: {
            id: courseId,
        }
    })
    
    let transactionToken = ""
    let transactionRedirectUrl = ""
    
    const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: MIDTRANS_SERVERKEY_DEV,
        clientKey: MIDTRANS_CLIENTKEY_DEV,
    })  

    const payload = {
        "transaction_details": {
            "order_id": userId + Math.random().toString().substring(2),
            "gross_amount": getCourse.price
        }, "credit_card":{
            "secure" : true
        },
    }

    snap.createTransaction(payload)
    .then( async (transaction)=>{
        // transaction token
        transactionToken = transaction.token;
        console.log('transactionToken:', transactionToken);

        // transaction redirect url
        transactionRedirectUrl = transaction.redirect_url;
        console.log('transactionRedirectUrl:',transactionRedirectUrl);

        await prisma.cart.create({
            data: {
                userId,
                courseId,
                imageUrl,
                price: getCourse.price, 
                isPaid: false,
                title,
                orderId: payload.transaction_details.order_id,
                checkoutlink: transactionRedirectUrl,
                checkoutToken: transactionToken
            }
        })
        return res.status(200).json({transactionToken, transactionRedirectUrl})
    })
    .catch((e)=>{
        console.log('Error occured:',e.message);
        return res.status(401).json({'error': e})
    })
    
}

export const updateCart= async (req, res) => {
    const { id } = req.params
    const { userId, courseId, status } = req.body 
    try {
        await prisma.cart.update({
            where: { id },
            data: {
                userId,
                courseId,
                status: 'Pending' 
            }
        })
        res.status(201).json({'success': 'Cart Update successfully'})
    } catch (error) {
        res.status(401).json({'error': error})
    }
}

export const deleteCart = async (req, res) => {
    const { id } = req.params
    try {
        await prisma.cart.delete({
            where: { id}
        })
        res.status(201).json({'success': 'Cart Deleted successfully'})
    } catch (error) {
        res.status(401).json({'error': error})
    }
}