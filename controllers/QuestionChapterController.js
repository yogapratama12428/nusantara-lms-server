import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getQuestion = async (req, res) => {
  try {
    const response = await prisma.questionChapter.findMany({});
    res.status(200).json({
      status: "ok",
      response: response,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.questionChapter.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "ok",
      response: response,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createQuestion = async (req, res) => {
  const { question, answer, chapterId } = req.body;
  try {
    await prisma.questionChapter.create({
      data: {
        question,
        answer,
        chapterId,
      },
    });
    res.status(200).json({
      status: "ok",
      response: "chapter has been created",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const updateQuestion = async (req, res) => {
  const { question, answer } = req.body;
  const { id } = req.params;
  try {
    await prisma.questionChapter.update({
      where: {
        id,
      },
      data: {
        question,
        answer,
      },
    });
    res.status(201).json({
      status: "ok",
      response: "chapter has been updated",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.questionChapter.delete({
      where: {
        id,
      },
    });
    res.status(201).json({
      status: "ok",
      response: "chapter has been deleted",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
