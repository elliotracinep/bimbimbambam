import mongoose from "mongoose";

let estConectee = false;

export const connectDB = async () => {
  if (estConectee) return;
  const MONGODB_URI = process.env.MONGODB_URI || "bimbimbambam";

  try {
    await mongoose.connect(MONGODB_URI);
    estConectee = true;
    console.log("La connexion à la base de données est réussie!");
  } catch (erreur) {
    console.error(
      "La connexion à la base de données a échoué.",
      erreur.message,
    );
    process.exit(1);
  }
};
