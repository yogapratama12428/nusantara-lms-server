import crypto from "crypto";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TransactionService {
  async AddCourseToUser(getOrderId) {
    const data = await prisma.purchase.create({
      data: {
        userId: getOrderId.userId,
        courseId: getOrderId.courseId,
      },
    });

    return {
      data,
    };
  }

  async UpdateCart(order_id) {
    return await prisma.cart.updateMany({
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

const handleAddCourseToUser = async (order_id) => {
  const getOrderId = await prisma.cart.findFirst({
    where: {
      orderId: order_id,
    },
  });
  console.log("getOrderId:", getOrderId);

  const isDuplicate = await prisma.purchase.findUnique({
    where: {
      courseId: getOrderId.courseId,
    },
  });

  console.log("Course Already Exist:", isDuplicate);

  //check duplicate
  if (!isDuplicate) {
    // Add Course to User
    const AddUserToCourse = await prisma.purchase.create({
      data: {
        userId: getOrderId.userId,
        courseId: getOrderId.courseId,
      },
    });
    console.log(AddUserToCourse);
    //Update Status Card
    await prisma.cart.updateMany({
      where: {
        orderId: order_id,
      },
      data: {
        isPaid: true,
      },
    });

    console.log("Course Already Successfully to Add:", isDuplicate);
  }
};

export const createPayment = async (req, res) => {
  // const { order_id, transaction_status, signature_key, gross_amount, status_code } = req.body

  const data = req.body;

  console.log(data);

  await checkSignature(data);

  let orderId = data.order_id;
  let transactionStatus = data.transaction_status;
  let fraudStatus = data.fraud_status;

  if (transactionStatus == "capture") {
    if (fraudStatus == "accept") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      await handleAddCourseToUser(orderId);
    }
  } else if (transactionStatus == "settlement") {
    // TODO set transaction status on your database to 'success'
    // and response with 200 OK
    await handleAddCourseToUser(orderId);
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "deny" ||
    transactionStatus == "expire"
  ) {
    // TODO set transaction status on your database to 'failure'
    // and response with 200 OK
  } else if (transactionStatus == "pending") {
    // TODO set transaction status on your database to 'pending' / waiting payment
    // and response with 200 OK
  }

  res.status(200).json({
    status: "Success",
    message: "OK",
  });
};
