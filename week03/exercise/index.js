"use strict";

const cars = require("./cars.js");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/cars", (req, res) => res.send({ data: cars }));

app.get("/api/cars/:id", (req, res) => {
  const car = cars.find((car) => car.id === parseInt(req.params.id));
  res.status(200).send({ data: car });
});

app.post("/api/cars", (req, res) => {
  const { make, model, colour } = req.body;
  const newCar = {
    id: Date.now(),
    make,
    model,
    colour,
  };
  cars.push(newCar);
  res.status(201).send({ data: newCar });
});

app.patch("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = cars.findIndex((car) => car.id === id);
  if (!id) {
    res.status(404).send({
      error: `Car with id ${id} not found`,
    });
    return;
  }
  const { id: _id, ...theRest } = req.body;
  const updatedCar = {
    ...cars[index],
    ...theRest,
  };
  cars[index] = updatedCar;
  res.status(202).send({ data: updatedCar });
});

app.put("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = cars.findIndex((car) => car.id === id);
  if (!id) {
    res.status(404).send({
      error: `Car with id ${id} not found`,
    });
    return;
  }
  const { make, model, colour } = req.body;
  const updatedCar = { id, make, model, colour };
  cars[index] = updatedCar;
  res.status(202).send({ data: updatedCar });
});

app.delete("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = cars.findIndex((car) => car.id === id);
  if (!id) {
    res.status(404).send({
      error: `Car with id ${id} not found`,
    });
    return;
  }
  const deletedCar = cars[index];
  cars.splice(index, 1);
  res.status(200).send({ data: deletedCar });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
