const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());

// Middleware

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    // if (!tour) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid Id",
    });
  }

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid Id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour/>",
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid Id",
    });
  }
  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not implemented yet",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not implemented yet",
  });
};
const createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not implemented yet",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not implemented yet",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "Route not implemented yet",
  });
};

// Route Handlers

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route("/api/v1/users").get(getAllUsers).post(createUsers);

app
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Server

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
