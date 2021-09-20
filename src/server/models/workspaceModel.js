import mongoose from "mongoose";

const workspaceSchema = mongoose.Schema(
  {
    workspaceCreator: {
      type: String,
    },
    workspaceName: {
      type: String,
      required: true,
    },
    channels: {
      type: Array,
    },
    directMessages: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
