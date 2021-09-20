import Workspace from "../models/workspaceModel.js";

export const newWorkSpace = async (request, response) => {
  const { workspaceName, workspaceCreator } = request.body;
  const newWorkSpace = await Workspace({
    workspaceCreator: workspaceCreator,
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
  const workspaceCreator = request.params.userId;

  try {
    const workspace = await Workspace.find({
      workspaceCreator: workspaceCreator,
    });

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
    response.status(500).json(error.message);
  }
};
export const newChannel = async (request, response) => {
  const workspaceId = request.params.workspaceId;
  console.log(workspaceId);
  try {
    const newChannel = await Workspace.findOneAndUpdate(
      { _id: workspaceId },
      {
        $push: {
          channels: request.body,
        },
      },
      { new: true, useFindandModify: false }
    );

    response.status(200).json(newChannel);
  } catch (error) {
    console.log(error.message);
    response.status(500).json(error.message);
  }
};
