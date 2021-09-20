import express from "express";

import {
  newWorkSpace,
  getAllWorkspace,
  getWorkspace,
  newChannel,
} from "../controller/workspaceController.js";
const router = express.Router();
router.get("/workspace/workspaceId/:workspaceId", getWorkspace);
router.post("/workspace", newWorkSpace);
router.get("/workspace/userId/:userId", getAllWorkspace);
router.put("/workspace/newChannel/:workspaceId", newChannel);
export default router;
