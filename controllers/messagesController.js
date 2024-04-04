const Message = require("../models/Message");

//

const getMessages = async (req, res) => {
  let user = req.user;
  const messages = await Message.find()
    .populate("sentBy")
    .sort({ createdAt: 1 });

  const isLoggedIn = req.isAuthenticated();

  const locals = {
    title: "ChatBoard 🚀",
    isLoggedIn,
  };

  if (!user) {
    user = {
      fullName: "",
      isAdmin: false,
    };
  }

  return res.render("board", { locals, user, messages });
};

const createMessage = async (req, res) => {
  const { title, message } = req.body;
  const isLoggedIn = req.isAuthenticated();

  const locals = {
    title: "ChatBoard 🚀",
    isLoggedIn,
  };
  const user = req.user;
  const senderId = user._id;

  try {
    const newMessage = await Message.create({
      title,
      message,
      sentBy: senderId,
    });
    console.log("user:", user);
    console.log("senderid:", senderId);

    console.log(newMessage);
    return res.redirect("/board");
  } catch (error) {
    console.log(error);
    const errors = { messageErrors: "Failed to send message, try again!" };
    return res.render("board", { ...locals, user, errors });
  }
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  console.log(messageId);
  await Message.findByIdAndDelete(messageId);
  return res.redirect("/board");
};

module.exports = {
  deleteMessage,
  createMessage,
  getMessages,
};
