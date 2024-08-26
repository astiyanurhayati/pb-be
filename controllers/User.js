import { where } from "sequelize";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import bcryptjs from "bcryptjs";

const User = db.User;

export const register = async (req, res) => {
  try {
    const { password, full_name, email } = req.body;
    const oldUser = await User.findOne({
      where: {
        email,
      },
    });
    if (oldUser) {
      return res.status(403).json({ message: "User telah ada!" });
    }

    const user = await User.create({
      password: bcryptjs.hashSync(password, 8),
      full_name,
      email,
    });
    const token = jwt.sign({ uuid: user.uuid }, process.env.SECRET, {
      expiresIn: 2592000,
    });

    res.status(201).json({ user, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }


    const token = jwt.sign({ uuid: user.uuid }, process.env.SECRET, {
      expiresIn: 2592000,
    });



    if (bcryptjs.compareSync(password, user.password))
      return res.status(200).json({ user, token });

    return res.status(401).json({ message: "Password Salah!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout berhasil!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getSelf = async (req, res) => {
  try {
    const token = req.cookies.token;
    const id = jwt.verify(token, process.env.SECRET).uuid;
    const user = await User.findOne({
      where: {
        uuid: id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: e, success: false });
  }
};
export const getAll = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        role: {
          [db.Sequelize.Op.not]: "admin",
        },
      },
    });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, success: false });
  }
};

export const createStaff = async (req, res) => {
  try {
    const { password, nama_lengkap, email } = req.body;
    const oldUser = await User.findOne({
      where: {
        email,
      },
    });
    if (oldUser) {
      return res.status(403).json({ message: "User telah ada!" });
    }

    const user = await User.create({

      password: bcryptjs.hashSync(password, 8),
      nama_lengkap,
      email,
      role: "petugas",
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const findById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: e, success: false });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }
    await user.destroy({});
    return res.status(200).json({ message: "Berhasil menghapus user!" });
  } catch (e) {
    return res.status(500).json({ message: e, success: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password, nama_lengkap, email } = req.body;
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    await user.update({

      password: bcryptjs.hashSync(password, 8),
      nama_lengkap,
      email,
    });

    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
