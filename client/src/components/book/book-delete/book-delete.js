import React, { Component } from 'react';
import { toast } from 'react-toastify';
import BookService from '../../../services/book-service';
import '../../form.css';

class BookDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {},
            isLoading: true
        };

        this.handleForm = this.handleForm.bind(this);
    }

    handleForm(evt) {
        evt.preventDefault();

        const token = sessionStorage.getItem("token");
        const id = this.props.match.params.id;

        BookDelete.bookService.delete(id, token)
            .then(data => {
                if (data.book) {
                    this.props.history.push("/");
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            })
            .catch(err => toast.error(err));
    }

    render() {
        if (this.state.isLoading) {
            return <h2>Loading...</h2>;
        }

        const book = this.state.book;

        return (
            <div className="form">
            <h1>Delete Student Book</h1>
            <form onSubmit={this.handleForm}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={book.title}
                    disabled
                />

                <label htmlFor="grade">Grade</label>
                <input
                    type="number"
                    id="grade"
                    value={book.grade}
                    disabled
                />

                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    value={book.subject}
                    disabled
                />

                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    value={book.author}
                    disabled
                />

                <label htmlFor="publisher">Publisher</label>
                <input
                    type="text"
                    id="publisher"
                    value={book.publisher}
                    disabled
                />

                <label htmlFor="year">Year</label>
                <input
                    type="number"
                    id="year"
                    value={book.year}
                    disabled
                />

                <label htmlFor="imageUrl">Image</label>
                <input
                    type="text"
                    id="imageUrl"
                    value={book.imageUrl}
                    disabled
                />

                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    step="0.1"
                    id="price"
                    value={book.price}
                    disabled
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={book.description}
                    disabled
                />

                <button id="delete" type="submit">Delete</button>
            </form>
        </div>
        );
    }

    static bookService = new BookService();

    componentDidMount() {
        const token = sessionStorage.getItem("token");
        const id = this.props.match.params.id;

        BookDelete.bookService.getDetails(id, token)
            .then(data => {
                if (data.book) {
                    this.setState({ book: data.book, isLoading: false });
                } else {
                    this.props.history.push("/");
                    toast.error(data.message);
                }
            })
            .catch(err => toast.error(err));
    }
}

export default BookDelete;