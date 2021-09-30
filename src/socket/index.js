const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(5000, {
  cors: {
    origin: "*",
  },
});

let users = [];
const rooms = { users: {} };
let userToSendRoom = [];
const sendUser = (userId, socketId) => {
  //if user is not already in user array then add the user with current userId and socketId
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users);
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUsers = (memberData) => {
  let members = {};
  let userSocket = "";
  memberData.forEach((data) => {
    const { _id } = data;
    users.forEach((data) => {
      const { socketId } = data;
      if (data.userId === _id) {
        console.log("wew");
        members[`${_id}`] = socketId;
      }
    });
  });

  return members;
};
const getReceiver = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};
io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("channel-created", (room, channelMembers) => {
    // rooms[room.channelName] = { users: {} };
    // socket.join(room.channelName);
    // rooms[room.channelName].users[socket.id] = channelMembers;
    // console.log(rooms[room.channelName].users[socket.id]);
    // console.log(rooms);
    ///////////////////////////socket.broadcast.emit("room-created", room);
    // io.emit("room-created", room);
    // io.to(room.channelName).emit("getChannel", room);
  });
  // socket.on("sendUser", (users) => {
  //   users.forEach((data) => {
  //     const { _id } = data;
  //     sendUser;
  //   });
  // });
  socket.on("sendUser", (userId) => {
    // send user and add to array of user
    sendUser(userId, socket.id);
    // sending to client
    // io.emit("getUsers", users);
  });

  socket.on("send-chat-message", ({ content, to, sender, chatName }) => {
    const payload = {
      content,
      chatName,
      sender,
    };
    socket.to(to).emit("new-message", payload);
  });
  socket.on("send-socket-server", (room, channelMembers) => {
    socket.join(room);
    // const data = getUsers(channelMembers);
    // socket.join(room);
    // channelMembers.forEach((dataS) => {
    //   const { _id } = dataS;
    //   // data[`${_id}`].join(room);
    // });
    // cc
    // console.log("data ", data);

    io.emit("room-created", room, channelMembers);
    // console.log(rooms);
  });
  socket.on("join-room", (room, userId) => {
    const receiver = getReceiver(userId);
    socket.join(room);
    // rooms[room] = { users: ([receiver.socketId] = userId) };
    // console.log("userId ", userId);
    // console.log(rooms[room]);
    // socket.broadcast.to(room).emit("room", room);
    // rooms[room] = { users: { receiver.socketId : userId } };
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
    // removeUser(socket.id);

    // io.emit("getUsers", users);
  });
});
instrument(io, { auth: false });
