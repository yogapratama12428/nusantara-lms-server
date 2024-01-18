import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPurchase = async (req, res) => {
    try {
        const response = await prisma.purchase.findMany({
            include: {
                courses: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

export const getPurchaseById = async (req, res) => {
    const { userId } = req.params
    try {
        const response = await prisma.purchase.findMany({
            where: {
                userId
            },
            include: {
                courses: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: 'Not Found' })
    }
}

export const createPurchase = async (req, res) => {
    const { userId, orderId } = req.body 
    try {
        
        const getOrderId = await prisma.cart.findFirst({
            where: {
                orderId: orderId
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
                orderId
            },
            data: {
                isPaid: true,
            }
        })

        res.status(201).json({'success': 'Purchase added successfully'})
    } catch (error) {
        res.status(401).json({'error': error})
    }
}

export const updatePurchase = async (req, res) => {
    const { courseId } = req.params
    try {
        await prisma.purchase.update({
            where: { courseId },
            data: {
                userId,
                courseId
            }
        })
        res.status(201).json({'success': 'Purchase Update successfully'})
    } catch (error) {
        res.status(401).json({'error': error})
    }
}

export const deletePurchase = async (req, res) => {
    const { id } = req.params
    try {
        await prisma.purchase.delete({
            where: {
                id
            }
        })
        res.status(201).json({'success': 'Purchase Deleted successfully'})
    } catch (error) {
        res.status(401).json({'error': error})
    }
}