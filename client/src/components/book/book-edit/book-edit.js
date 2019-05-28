import React, { Component } from 'react';
import { toast } from 'react-toastify';
import BookService from '../../../services/book-service';
import '../../form.css';

class BookEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            grade: "",
            subject: "",
            author: "",
            publisher: "",
            year: "",
            description: "",
            imageUrl: "",
            price: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    static bookService = new BookService();

    componentWillMount() {
        const token = sessionStorage.getItem("token");
        const id = this.props.match.params.id;

        BookEdit.bookService.getDetails(id, token)
            .then(data => {
                if (data.book) {
                    const book = data.book;
                    
                    this.setState({
                        title: book.title,
                        grade: book.grade,
                        subject: book.subject,
                        author: book.author,
                        publisher: book.publisher,
                        year: book.year,
                        description: book.description,
                        imageUrl: book.imageUrl,
                        price: book.price
                    });
                } else {
                    this.props.history.push("/");
                    toast.error(data.message);
                }
            })
            .catch(err => toast.error(err));
    }

    handleChange(evt) {
        const { value, id } = evt.target;

        this.setState({
            [id]: value
        });
    }

    handleForm(evt) {
        evt.preventDefault();

        const token = sessionStorage.getItem("token");
        const id = this.props.match.params.id;

        BookEdit.bookService.edit(id, token, this.state)
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
        return(
            <div className="form">
                <h1>Edit Student Book</h1>
                <form onSubmit={this.handleForm}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="grade">Grade</label>
                    <input
                        type="number"
                        id="grade"
                        value={this.state.grade}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={this.state.subject}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={this.state.author}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="publisher">Publisher</label>
                    <input
                        type="text"
                        id="publisher"
                        value={this.state.publisher}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        id="year"
                        value={this.state.year}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="imageUrl">Image</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        step="0.1"
                        id="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description" 
                        value={this.state.description}
                        onChange={this.handleChange} 
                    />

                    <button id="edit" type="submit">Edit</button>
                </form>
            </div>
        );
    }
}

export default BookEdit;