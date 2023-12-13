import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
    try {
        const response = await prisma.user.findMany({})
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await prisma.user.findUnique({
            where: {
                id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    
}
