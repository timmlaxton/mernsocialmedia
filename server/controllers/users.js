import User from "../models/User";

export const getUser = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await User.findById(id);
    res.status(202).json(user);
  } catch (error) {
    res.status(404).json({ messgae: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = await req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, locatiokn, picturpePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          locatiokn,
          picturpePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ messgae: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.friendById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, locatiokn, picturpePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          locatiokn,
          picturpePath,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ messgae: err.message });
  }
};
