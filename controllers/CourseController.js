import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCourse = async (req, res) => {
  try {
    const response = await prisma.course.findMany({});
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.course.findUnique({
      where: {
        id: id,
      },
      include: {
        chapters: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            vidios: true,
            questionChapters: true,
          },
        },
        purchases: true,
        attachments: true,
        captures: true,
        points: true,
        tools: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getCourseLearnById = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const userUpdateProgress = await prisma.userProgress.count({
      where: { userId, courseId },
    });

    const countVideo = await prisma.vidio.count({
      where: { courseId },
    });

    const progressCourse = (userUpdateProgress / countVideo) * 100;

    const progressVideo = await prisma.userProgress.findMany({
      where: {
        userId,
        courseId,
      },
    });

    const progressQuestion = await prisma.userProgressQuestion.findMany({
      where: {
        userId,
        courseId,
      },
    });

    const response = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            vidios: {
              orderBy: {
                createdAt: "asc",
              },
            },
            questionChapters: true,
          },
        },
        purchases: true,
        attachments: true,
        captures: true,
        points: true,
        tools: true,
      },
    });

    res
      .status(200)
      .json({ progressVideo, progressQuestion, progressCourse, response });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createCourse = async (req, res) => {
  const { userId, title } = req.body;
  try {
    await prisma.course.create({
      data: {
        userId,
        title,
      },
    });
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

export const updateCategoryCourse = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        category: {
          connect: {
            name: name,
          },
        },
      },
    });
    res.status(201).json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

export const reOrderChapter = async (req, res) => {
  const { list } = req.body;
  console.log(list);
  try {
    for (let item of list) {
      await prisma.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }
    res.status(201).json({ message: "Course reorder successfully" });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const {
    userId,
    title,
    description,
    imageUrl,
    price,
    isPublished,
    isFree,
    fulltext,
    videoUrl,
    isCompleted,
    isPromoted,
  } = req.body;
  const { id } = req.params;

  try {
    const response = await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        userId,
        title,
        description,
        imageUrl,
        price,
        isPublished,
        isFree,
        fulltext,
        videoUrl,
        isCompleted,
        isPromoted,
      },
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

export const deletedCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.course.delete({
      where: {
        id: id,
      },
      include: {
        chapters: true,
        purchases: true,
        attachments: true,
      },
    });
    res.status(201).json({ message: "Course Deleted Successfully" });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};
