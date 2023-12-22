import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getVidios = async (req, res) => {
    try {
        const response = await prisma.vidio.findMany({})
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const getVidiosById = async (req, res) => {
    const { id } = req.params
    
    try {
        const response = await prisma.vidio.findUnique({
            where: {
                id
            }
        })    
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const createVidios = async (req, res ) => {
    const { title, url, chapterId } = req.body

    try {
        await prisma.vidio.create({
            data: {
                title,
                url,
                chapterId
            }
        })
        res.status(201).json({'msg' : "title Created successfully"})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}

export const updateVidios = async (req, res) => {
    const { id } = req.params
    const { title, url } = req.body

    try {
        await prisma.vidio.update({
            where: {
                id
            }, 
            data: {
                title,
                url
            }
        })
        res.status(201).json({'msg' : "title updated successfully"})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}

export const deleteVidios = async (req, res) => {
    const { id } = req.params

    try {
        await prisma.vidio.delete({
            where: {
                id
            }
        })
        res.status(201).json({'msg' : "title deleted successfully"})
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}