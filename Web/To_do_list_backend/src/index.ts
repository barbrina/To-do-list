import cors from "cors";
import express from "express";
import { listController } from "./controllers/list.controller";
import { shareController } from "./controllers/share.controller";
import { taskController } from "./controllers/task.controller";
import { userController } from "./controllers/user.controller";
import { AppDataSource } from "./database/data-source";
import { AuthMiddleware } from "./middlewares/auth.middleware";

const app = express();

app.use(cors());

app.use(express.json());

AppDataSource.initialize();

app.post("/users", async (req, res) => {
  return await userController.store(req, res);
});

app.get("/users/me", AuthMiddleware.auth, async (req, res) => {
  return await userController.me(req, res);
});

app.post("/users/login", async (req, res) => {
  return await userController.index(req, res);
});

app.post("/list", AuthMiddleware.auth, async (req, res) => {
  return await listController.store(req, res);
});

app.get("/list/all", AuthMiddleware.auth, async (req, res) => {
  return await listController.index(req, res);
});

app.get("/list/name/:id", AuthMiddleware.auth, async (req, res) => {
  return await listController.name(req, res);
});

app.delete("/list", AuthMiddleware.auth, async (req, res) => {
  return await listController.delete(req, res);
});

app.post("/list/task", async (req, res) => {
  return await taskController.store(req, res);
});

app.put("/list/task/completed", async (req, res) => {
  return await taskController.update(req, res);
});

app.put("/list/task/name", async (req, res) => {
  return await taskController.edit(req, res);
});

app.get("/list/task/:id", async (req, res) => {
  return await taskController.getAllTasks(req, res);
});

app.get(
  "/list/collaborators/:id",
  async (req, res) => await listController.searchColaborators(req, res)
);

app.delete("/list/task", async (req, res) => {
  return await taskController.delete(req, res);
});

app.get("/share", AuthMiddleware.auth, async (req, res) => {
  return await shareController.index(req, res);
});

app.post("/share", async (req, res) => {
  return await shareController.store(req, res);
});

app.delete("/share", async (req, res) => {
  return await shareController.delete(req, res);
});

app.get("/invites", AuthMiddleware.auth, async (req, res) => {
  return await shareController.invites(req, res);
});

app.put("/invites", async (req, res) => {
  return await shareController.accepted(req, res);
});

app.delete("/invites/:id", async (req, res) => {
  return await shareController.deleted(req, res);
});

app.listen(3000);
