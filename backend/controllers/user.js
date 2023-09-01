import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password tidak cocok!" });
  //menghasilkan salt dari bcrypt
  const salt = await bcrypt.genSalt();
  //enkripsi password menggunakan bcrypt dengan salt diatas
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name,
      email,
      password: hashPassword,
    });
    res.json({ msg: "Register berhasil" });
  } catch (err) {
    console.error(err);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ msg: "Email tidakk ditemukan!" });
    //perbandingan password yg diberikan dengan yg didatabase, bcrypt.compare adalah metode untuk membandingkan password
    //menerima 2 argumen, password yg dimasukkan user dan hash password di db
    const match = await bcrypt.compare(req.body.password, user[0].password);
    console.log(match); //hasilnya true or false
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    //jika berhasil buat token akses dan refresh
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    //membuat token akses menggunakan userId,name,email
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    //refresh token
    const refreshToken = jwt.sign(
      //informasi untuk identifikasi tokennya
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        //optional
        expiresIn: "1d",
      }
    );
    //merubah refresh token di field refresh_token
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    //mengatur cookie(menyimpan data di klien(browser)) dengan menyimpan refreshToken
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //hanya dapat diakses melalui HTTP
      maxAge: 24 * 60 * 60 * 1000, //maksimal lama cookie dalam milisecond
    });
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204); //no-content
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  //memperbarui refresh token menjadi null 
  await Users.update(
    { refreshToken: null },
    {
        //berdasarkan id
      where: {
        id: userId,
      },
    }
  );
  //menghapus cookie dengan nama cookie refreshToken
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
