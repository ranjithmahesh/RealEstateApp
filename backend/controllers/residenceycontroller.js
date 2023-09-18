import asyncHandler from "express-async-handler";
import prisma from "../config/prismaConfid.js";

// function to create a Residencies

const createresidencey = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "residencey created successfully ", residency });
    //   message: "residencey created successfully "
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("A residency with adress already there");
    }
    throw new Error(error.message);
  }
});

// function to get all the Residencies
const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a single Residencies
const getResidencies = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const residenciey = await prisma.residency.findUnique({
    where: {
      id,
    },
  });
  res.send(residenciey);
});



export { createresidencey, getAllResidencies, getResidencies,  };
