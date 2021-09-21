import mongoose from "mongoose";

const workspaceSchema = mongoose.Schema(
  {
    workspaceCreator: {
      type: String,
    },
    isMember: {
      type: Boolean,
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
