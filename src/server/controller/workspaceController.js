import Workspace from "../models/workspaceModel.js";
export const newWorkSpace = async (request, response) => {
  const { workspaceName } = request.body;
  const newWorkSpace = await Workspace({
    workspaceName: workspaceName,
  });
  try {
    const saveWorkspace = await newWorkSpace.save();
    response.status(200).json(saveWorkspace);
  } catch (error) {
    response.status(500).json(error.message);
  }
};
export const getAllWorkspace = async (request, response) => {
  try {
    const workspace = await Workspace.find({});
    response.status(200).json(workspace);
  } catch (error) {
    response.status(500).json(error.message);
  }
};
export const getWorkspace = async (request, response) => {
  const workspaceId = request.params.workspaceId;

  try {
    const workspace = await Workspace.find({ _id: workspaceId });
    response.status(200).json(workspace);
  } catch (error) {
    console.log(error.message);
    response.status(500).json(error.message);
  }
};
