import { Song } from "../models/song";
import { User } from "../models/user";

const addSong = async (req, res, next) => {
  const createdSong = new Task({
    titre: req.body.titre,
    album: req.body.album,
    duree: req.body.duree,
    note: req.body.note,
    artiste: req.body.artiste,
    lien: req.body.lien,
  });
  const result = await createdSong.save();
  res.status(201).json(result);
};

const getSongs = async (req, res, next) => {
  const songs = await Song.find().exec();
  res.json(songs);
};

const addUser = async (req, res, next) => {
  const createdUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  const result = await createdUser.save();
  res.status(201).json(result);
};

const getUsers = async (req, res, next) => {
  const users = await User.find().exec();
  res.json(users);
};
export { addSong, getSongs, addUser, getUsers };
