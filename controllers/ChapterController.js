import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getChapter = async (req, res) => {
  try {
    const response = await prisma.chapter.findMany({});
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getChapterById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.chapter.findUnique({
      where: {
        id,
      },
      include: {
        vidios: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createChapter = async (req, res) => {
  const { title, courseId, position } = req.body;
  try {
    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    await prisma.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    });
    res.status(201).json({ success: "Chapter added successfully" });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const updateChapter = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    videoUrl,
    isPublished,
    isFree,
    position,
    fulltext,
  } = req.body;
  try {
    await prisma.chapter.update({
      where: { id },
      data: {
        title,
        description,
        videoUrl,
        isPublished,
        isFree,
        position,
        fulltext,
      },
    });
    res.status(201).json({ success: "Chapter update successfully" });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const deleteChapter = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.chapter.delete({
      where: { id },
    });
    res.status(201).json({ success: "Chapter delete successfully" });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const updateProgress = async (req, res) => {
  const { userId, chapterId, courseId, videoId, isCompleted } = req.body;

  try {
    const response = await prisma.userProgress.create({
      data: {
        userId,
        chapterId,
        videoId,
        courseId,
        isCompleted,
      },
    });

    res.status(201).json({ message: response });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

export const getChapterProgressById = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId, courseId },
    });

    const userUpdateProgress = await prisma.userProgress.count({
      where: { userId, courseId },
    });

    const countVideo = await prisma.vidio.count({
      where: { courseId },
    });

    const progresCourse = (userUpdateProgress / countVideo) * 100;

    res.status(200).json({
      status: "success",
      response: progresCourse,
      data: progress,
    });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const deleteProgress = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.userProgress.deleteMany({
      where: {
        userId: id,
      },
    });
    res.status(201).json({ success: response });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
