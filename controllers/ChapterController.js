import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getChapter = async (req, res) => {
    try {
        const response = await prisma.chapter.findMany({
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const getChapterById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await prisma.chapter.findUnique({
            where: {
                id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const createChapter = async (req, res) => {
    const { title, courseId, position } = req.body 
    try {

        const lastChapter = await prisma.chapter.findFirst({
            where: {
                courseId,
            },
            orderBy: {
                position: "desc"
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1: 1;

        await prisma.chapter.create({
            data: {
                title,
                courseId,
                position: newPosition,
            }
        })
        res.status(201).json({'success': 'Chapter added successfully'})
    } catch (error) {
        res.status(401).json({'error': error})
    }
}

export const updateChapter = async (req, res) => {
    const { id } = req.params
    const { title, description, videoUrl, isPublished, isFree, position, fulltext } = req.body 
    try {
        await prisma.chapter.update({
            where: {id},
            data: {
                title,
                description, 
                videoUrl,
                isPublished,
                isFree,
                position,
                fulltext
            }
        })
        res.status(201).json({'success': 'Chapter update successfully'})
    }
    catch (error) {
        res.status(401).json({'error': error})
    } 

}

export const deleteChapter = async (req, res) => {
    const { id  } = req.params

    try {
        await prisma.chapter.delete({
            where: {id}
        })
        res.status(201).json({'success': 'Chapter delete successfully'})
    } catch (error) {
        res.status(401).json({'error': error})
    }
}