import express from "express";
import { Book } from "../models/bookModel.js";

export const bookRoutes = express.Router();

bookRoutes.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishedYear) {
            response.status(400).send({ message: "Title, author and published year are required" });
        } else {
            const newBook = {
                title: request.body.title,
                author: request.body.author,
                publishedYear: request.body.publishedYear
            };
            const book = await Book.create(newBook);
            response.status(201).send(book);
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


bookRoutes.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        response.status(200).send({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

bookRoutes.get('/:id', async (request, response) => {
    try {
        var { id } = request.params;
        const book = await Book.findById(id);
        response.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

bookRoutes.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishedYear) {
            response.status(400).send({ message: "Title, author and published year are required" });
        } else {
            const bookToUpdate = {
                title: request.body.title,
                author: request.body.author,
                publishedYear: request.body.publishedYear
            };
            var { id } = request.params;
            const newBookInfo = await Book.findByIdAndUpdate(id, bookToUpdate);
            if (!newBookInfo) {
                response.status(404).send({ message: "Book not found!" });
            }
            response.status(200).send({ message: "Book updated successfully" });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

bookRoutes.delete('/:id', async (request, response) => {
    try {
        var { id } = request.params;
        const newBookInfo = await Book.findByIdAndDelete(id);
        if (!newBookInfo) {
            response.status(404).send({ message: "Book not found!" });
        }
        response.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});