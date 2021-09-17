import express from "express";

import {
  newWorkSpace,
  getAllWorkspace,
  getWorkspace,
} from "../controller/workspaceController.js";
const router = express.Router();

router.post("/workspace", newWorkSpace);
router.get("/workspace", getAllWorkspace);
router.get("/workspace/:workspaceId", getWorkspace);

export default router;
