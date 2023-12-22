import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getTools = async (req, res) => {
    try {
        const response = await prisma.tool.findMany({})
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const getToolById = async (req, res) => { 
    const { id } = req.params

    try {
        const response = await prisma.tool.findUnique({
            where: {
                id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const createTool = async (req, res) => {
    const { title, imageUrl, courseId } = req.body

    try {
        await prisma.tool.create({
            data: {
                title,
                imageUrl,
                courseId
            }
        })
        res.status(201).json({'msg': 'Tool created successfully'})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}

export const updateTool = async (req, res) => {
    const { id } = req.params
    const { title, imageUrl, courseId } = req.body
    
    try {
        await prisma.tool.update({
            where: {
                id
            },
            data: { title, imageUrl, courseId }
        })
        res.status(201).json({'msg': 'Tool updated successfully'})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}

export const deleteTool = async (req, res) => {
    const { id } = req.params
    
    try {
        await prisma.tool.delete({
            where: {
                id
            },
        })
        res.status(201).json({'msg': 'Tool deleted successfully'})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}