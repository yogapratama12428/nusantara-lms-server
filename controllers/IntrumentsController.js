import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getInstruments = async ( req, res ) => { 
    try {
        const response = await prisma.instrument.findMany({})
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getInstrumentById = async ( req, res ) => {
    const { id } = req.params

    try {
        const response = await prisma.instrument.findUnique({
            where: {
                id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
 }

 export const createInstrument = async ( req, res ) => {
    const { title, imageUrl } = req.body 
    
    try {
        await prisma.instrument.create({
            data: { title, imageUrl },
        })
        res.status(201).json({'msg' : "Intrument created successfully"})
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
 }

 export const updateInstrument = async ( req, res ) => {
    const { id } = req.params
    const { title, imageUrl } = req.body

    try {
        await prisma.instrument.update({
            where: { id }, 
            data: { title, imageUrl} 
        })
        res.status(201).json({'msg' : "Intrument updated successfully"})
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
 }

 export const deleteInstrument = async (req, res) => {
    const { id } = req.params

    try {
        await prisma.instrument.delete({
            where : { id }
        })
        res.status(201).json({'msg' : "Intrument deleted successfully"})
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
 }