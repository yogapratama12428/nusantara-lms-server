import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getCategory = async (req, res) => {
    try {
        const response = await prisma.category.findMany({
            include: {
                courses: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getCategoryById = async(req, res) => {
    const { id }  = req.params

    try {
        const response = await prisma.category.findUnique({
            where: {
                id
            },
            include: {
                courses: true
            }
        })

        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const createCategory = async (req, res) => {
    const { name } = req.body
    try {
        await prisma.category.create({
            data: {
                name
            }
        })

        res.status(201).json({ 'message': 'Category created successfully' })
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

export const updateCategory = async(req, res) => {
    const { id }  = req.params
    const { title } = req.body

    try {
        await prisma.category.update({
            where: {
                id
            },
            data: {
                title
            }
        })

        res.status(201).json({ 'message': 'Category updated successfully' })
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params
    
    try {
        await prisma.category.delete({
            where: {
                id
            },
            include: {
                courses: true
            }
        })
        res.status(201).json({ 'message': 'Category deleted successfully' })
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}