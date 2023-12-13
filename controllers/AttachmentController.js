import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAttach = async (req, res) => {
    const { url, name, courseId } = req.body

    try {
        await prisma.attachment.create({
            data: {
                url, 
                name,
                courseId
            }
        })
        res.status(201).json("Attachment create Successfully")
    } catch (error) {
        res.status(401).json("Attachment create Failure")
    }
}

export const updateAttach = async (req, res) => {
    const { id } = req.params
    const { url, name, courseId } = req.body

    try {
        await prisma.attachment.update({
            where: { 
                id
            },
            data: {
                url, 
                name,
                courseId
            }
        })
        res.status(201).json("Attachment Update Successfully")
    } catch (error) {
        res.status(401).json("Attachment Update Failure")
    }
}

export const deleteAttachment = async(req, res) => {
    const { id } = req.params
    try {
        await prisma.attachment.delete({
            where: {id}
        })
        res.status(201).json("Attachment Delete Successfully")
    } catch (error) {
        res.status(401).json("Attachment Delete Failure")
    }
}