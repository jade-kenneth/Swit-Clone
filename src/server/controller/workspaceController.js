import Workspace from "../models/workspaceModel.js";

export const newWorkSpace = async (request, response) => {
  const { workspaceName, workspaceCreator, isMember } = request.body;
  const newWorkSpace = await Workspace({
    isMember: isMember,
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

  const {
    _id,

    isMember,
    workspaceName,
    workspaceCreator,
    channelName,
    channelMembers,
  } = request.body;

  try {
    const newChannel = await Workspace.findOneAndUpdate(
      { _id: workspaceId },
      {
        $push: {
          channels: {
            _id: _id,
            channelName: channelName,
            channelMembers: channelMembers,
          },
        },
      },
      { new: true, useFindandModify: false }
    );
    //available data workspaceCreator
    //wokrspaceName
    //isMember
    channelMembers.forEach(async (data) => {
      const { _id: workspaceAuthorized } = data;
      let newChannel = "";
      //check if this workspaces are already created
      //since creator is also in chat member then neglect finding its workspace
      //to avoid duplicate channel
      if (workspaceCreator !== workspaceAuthorized) {
        newChannel = await Workspace.findOneAndUpdate(
          {
            workspaceCreator: workspaceAuthorized,
            workspaceName: workspaceName,
          },
          {
            $push: {
              channels: {
                _id: _id,
                channelName: channelName,
                channelMembers: channelMembers,
              },
            },
          },
          { new: true, useFindandModify: false }
        );
      }

      if (workspaceCreator !== workspaceAuthorized && newChannel === null) {
        const newWorkSpace = await Workspace({
          isMember: true,

          workspaceCreator: workspaceAuthorized,
          workspaceName: workspaceName,
          channels: {
            _id: _id,
            channelName: channelName,
            channelMembers: channelMembers,
          },
        });
        await newWorkSpace.save();
      }
    });

    response.status(200).json(newChannel);
  } catch (error) {
    console.log(error.message);
    response.status(500).json(error.message);
  }
};
