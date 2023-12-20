import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCapture = async (req, res) => { 
    try {
        const response = await prisma.capture.findMany({})
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const createCapture = async (req, res) => {
    const { url, courseId } = req.body

    try {
        await prisma.capture.create({
            data: {
                url,
                courseId
            }
        })
        res.status(201).json({ 'msg' : 'Capture created successfully}'})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}


export const deleteCapture = async (req, res) => {
    const { id } = req.params

    try {
        await prisma.capture.delete({
            where: {
                id
            }
        })
        res.status(201).json({ 'msg' : 'Capture deleted successfully}'})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}