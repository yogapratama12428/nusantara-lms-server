import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getPoint = async (req, res ) => {
    try {
        const response = await prisma.point.findMany({})
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
} 

export const createPoint = async (req, res) => {
    const { title, courseId } = req.body 

    try {
        await prisma.point.create({
            data: {
                title,
                courseId
            }
        })
        res.status(201).json({ 'msg' : 'Point created successfully}'})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}

export const deletePoint = async (req, res) => {
    const { id } = req.params
    try {
        await prisma.point.delete({
            where: {
                id
            }
        })
        res.status(201).json({ 'msg' : 'Point deleted successfully}'})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}