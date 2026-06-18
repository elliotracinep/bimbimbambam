import { Symbol } from "../models/symbol";
import { User } from "../models/user";

const addSymbol = async (req, res, next) => {
  const createdSymbol = new Task({
    name: req.body.name,
    image: req.body.image,
  });
  const result = await createdSymbol.save();
  res.status(201).json(result);
};

const getSymbols = async (req, res, next) => {
  const symbols = await Symbol.find().exec();
  res.json(symbols);
};


export { addSymbol, getSymbols };
