import jwt from "jsonwebtoken";
import HttpError from "../util/http-error.js";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("le jeton est invalide !");
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log("Une erreur est survenue : ", error);
    const monErreur = new HttpError("L'authentification a échoué !", 401);
    return next(monErreur);
  }
};
export default checkAuth;
