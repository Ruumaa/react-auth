import Books from "../models/bookModel.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Books.findAll();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
  }
};

export const addBook = async (req, res) => {
  try {
    const { name, year, author, genre } = req.body;
    if (!name || !year || !author || !genre || !req.file)
      return res.sendStatus(400).json({ msg: "All attributes are required!" });
    //ambil data file yg diunggah
    const filephoto = req.file;
    let linkPhoto = "";
    if (filephoto) {
      linkPhoto = `http://localhost:5000/upload/${filephoto.filename}`;
    }
    const newBook = await Books.create({
      name,
      year,
      author,
      genre,
      file: linkPhoto,
    });
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
  }
};

export const updateBook = async (req, res) => {
  try {
    const { name, year, author, genre } = req.body;
    const id = req.params.id;
    if (!req.file) {
      return res.status(400).json({ msg: "Photo is required!" });
    }

    let linkPhoto = "";
    const filephoto = req.file;
    if (filephoto) {
      linkPhoto = `http://localhost:5000/upload/${filephoto.filename}`;
    }
    //catch perubahan jumlah baris
    const [updatedCount, updatedBook] = await Books.update(
      {
        name,
        year,
        author,
        genre,
        file: linkPhoto,
      },
      { where: { id }, returning: true }
    );
    if (updatedCount === 0) {
      return res.status(404).json({ msg: "Book not found" });
    }

    return res
      .status(200)
      .json({ msg: "Book updated successfully!", updatedBook });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const destroy = await Books.destroy({ where: { id } });
    if (!destroy) {
      return res.status(400).json({msg:"Book not found"});
    }

    return res.status(200).json({ msg: "Book deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
