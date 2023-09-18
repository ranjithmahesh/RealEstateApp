import asyncHandler from "express-async-handler";
import prisma from "../config/prismaConfid.js";

const createUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    res.status(400).json({ message: "User already Exist" });
  }

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json({ message: "User created successfully " });
  }
});

// function to book a visit for a  Residencies

const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },

      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((vist) => vist.id === id)) {
      res.status(400).send({
        message: `this residencey is already Booked by you on ${date}`,
      });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.status(201).send("your visit  is booked successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});
// function to cancle  visit for a  Residencies

const cancleBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visits) => visits.id === id);

    if (index === -1) {
      res.status(404).json({ message: "No Bookings found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("booking cancled successfully");
    }
  } catch (error) {
    throw new Error(error.message);
  }

});




// function to book a  Residencies in favourite of a user
 const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id )= id !== rid),
          },
        },
      });
      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({
        message: "updated  favorites",
        user: updateUser,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
 });



// function to get all  Residencies in favourite of a user
const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body
try {
  const favResd = await prisma.user.findUnique({
    where: { email }
    ,
    select:{favResidenciesID:true}
  })
  res.status(200).send(favResd)
} catch (error) {
      throw new Error(error.message);

}
})


export {
  createUser,
  bookVisit,
  allBookings,
  cancleBooking,
  toFav,
  getAllFavorites,
};
