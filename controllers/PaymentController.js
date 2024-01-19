import crypto from "crypto";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TransactionService {
  async AddCourseToUser(getOrderId) {
    return prisma.purchase.create({
      data: {
        userId: getOrderId.userId,
        courseId: getOrderId.courseId,
      },
    });
  }

  async UpdateCart(order_id) {
    return prisma.cart.updateMany({
      where: {
        orderId: order_id,
      },
      data: {
        isPaid: true,
      },
    });
  }

  async getOrderIdbyCart(order_id) {
    const getOrderId = await prisma.cart.findFirst({
      where: {
        orderId: order_id,
      },
    });

    return {
      getOrderId,
    };
  }
}

const transactionService = new TransactionService();

const checkSignature = async (data) => {
  const { MIDTRANS_SERVERKEY_DEV } = process.env;

  const hash = crypto
    .createHash("sha512")
    .update(
      data.order_id +
        data.status_code +
        data.gross_amount +
        MIDTRANS_SERVERKEY_DEV
    )
    .digest("hex");

  if (data.signature_key !== hash) {
    return {
      status: "error",
      message: "Invalid Signature Key",
    };
  }
};

export const createPayment = async (req, res) => {
  // const { order_id, transaction_status, signature_key, gross_amount, status_code } = req.body

  const data = req.body;

  console.log(data);

  await checkSignature(data);

  const getOrderId = await prisma.cart.findFirst({
    where: {
      orderId: data.order_id,
    },
  });

  console.log(getOrderId);

  // Add Course to User
  if (getOrderId) {
    const AddUserToCourse = await prisma.purchase.create({
      data: {
        userId: getOrderId.userId,
        courseId: getOrderId.courseId,
      },
    });

    console.log(AddUserToCourse);
  }

  //Update Status Card
  await prisma.cart.updateMany({
    where: {
      orderId: data.order_id,
    },
    data: {
      isPaid: true,
    },
  });

  res.status(200).json({
    status: "Success",
    message: "OK",
  });
};
