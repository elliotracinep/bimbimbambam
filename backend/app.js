import express from "express";
import symbolRoutes from "./routes/symbol-route.js"
import userRoutes from "./routes/user-routes.js";
import errorHandler from "./handler/error-handler.js";
import cors from "cors";
import { connectDB } from "./util/bd.js";

const port = process.env.PORT || 5000;

await connectDB();

const app = express();
app.use(cors());

app.use(express.json());

// les routes
app.use("/api/songs", symbolRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const erreur = new Error("La route est introuvable !");
  erreur.code = 404;
  next(erreur);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("Le serveur est activé au : ", `http//localhost:${port}`);
});
