import HttpError from "../util/http-error.js";
import { validationResult } from "express-validator";
import { Symbol } from "../models/symbol.js";

const getSymbols = async (req, res, next) => {
  let symbols;
  try {
    symbols = await Symbol.find();
  } catch (err) {
    console.log(err);
    const erreur = new HttpError("Une erreur s'est produite.", 500);
    return next(err);
  }
  if (!symbols) {
    return next(new HttpError("Les symboles n'ont pas été trouvés.", 404));
  }
  res.json({ symbols: symbols.map((symbol) => symbol.toObject({ getters: true })) });
};

const getSymbolById = async (req, res, next) => {
  const symbolID = req.params.symbolID;

  let symbol;
  try {
    symbol = await Symbol.findById(symbolID);
  } catch (err) {
    console.log(err);
    const erreur = new HttpError("Une erreur s'est produite.", 500);
    return next(err);
  }

  if (!symbol) {
    return next(new HttpError("Le symbole n'a pas été trouvé ...", 404));
  }

  res.json({ symbol: symbol.toObject({ getters: true }) });
};

const createSymbol = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log("Une erreur s'est produite ... ", validationErrors);
    return next(
      new HttpError(
        "Les informations saisies ne sont pas valides. Vérifiez votre payload.",
        422,
      ),
    );
  }
  const { name, image } =
    req.body;
  const createdSymbol = new Symbol({
    name,
    image
  });
  try {
    await createdSymbol.save();
  } catch (err) {
    console.log(err);
    const erreur = new HttpError(
      "l'ajout du symbole dans la base de données a échoué.",
      500,
    );
  }
  res.status(201).json({ symbol: createdSymbol });
};

const deleteSymbol = async (req, res, next) => {
  const symbolID = req.params.symbolID;
  let symbol;
  try {
    symbol = await Symbol.findByIdAndDelete(symbolID);

    if (!symbol) {
      return res.status(404).json({ msg: "Le symbole est introuvable." });
    }
    res.status(200).json({ msg: "Le symbole a été supprimé avec succès." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erreur lors de la suppression du symbole." });
  }
};

const updateSymbol = async (req, res, next) => {
  const symboltoUpdate = req.body;
  const symbolID = req.params.symbolID;

  try {
    const updatedSymbol = await Symbol.findByIdAndUpdate(symbolID, symboltoUpdate, {
      new: true,
    });
    if (!updatedSymbol) {
      return res.status(404).json({ message: "Le symbole est introuvable." });
    }
    res.status(200).json({ symbole: updatedSymbol.toObject({ getters: true }) });
  } catch (err) {
    res.status(500).json({ msg: "Erreur lors de la modification du symbole." });
  }
};

export default {
  getSymbols,
  getSymbolById,
  createSymbol,
  updateSymbol,
  deleteSymbol,
};
