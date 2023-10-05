import Book from '../models/Book.js';

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (!books.length) {
      //   throw new Error();
      //   throw { message: 'book not found' };
      throw { statusCode: 404, message: 'book not found' };
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
};
export const getBookById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      throw { statusCode: 404, message: 'book not found' };
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const addNewBook = async (req, res, next) => {
  try {
    const { name, author, image_url, tags, publishedDate } = req.body;
    // const newBook = new Book({ name, author, image_url, tags, publishedDate });
    // const savedBook = await newBook.save();
    const newBook = await Book.create({
      name,
      author,
      image_url,
      tags,
      publishedDate,
    });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { name, author, image_url, tags, publishedDate } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, author, image_url, tags, publishedDate },
      { new: true }
    );
    if (!updatedBook) {
      throw { statusCode: 404, message: 'book not found' };
    }
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const addTagToBook = async (req, res, next) => {
  const { id } = req.params;
  const { tag } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) {
      throw { statusCode: 404, message: 'book not found' };
    }

    book.tags.push(tag);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      throw { statusCode: 404, message: 'book not found' };
    }
    res.status(200).json({ message: 'book was deleted' });
  } catch (error) {
    next(error);
  }
};
