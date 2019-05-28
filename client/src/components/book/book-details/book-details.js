import React, { Component } from 'react';
import { toast } from 'react-toastify';
import BookService from '../../../services/book-service';
import './book-details.css';

class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {},
            isLoading: true
        };
    }

    render() {
        if (this.state.isLoading) {
            return <h2>Loading...</h2>;
        }

        const { book } = this.state;

        return(
            <div className="content">
                <div className="book-image">
                    <img src={book.imageUrl} alt="book"/>
                </div>
                <div className="book-details">
                    <div className="detail-row"><h2>Title</h2><h4>{book.title}</h4></div>
                    <div className="detail-row"><h2>grade</h2><h4>{book.grade}</h4></div>
                    <div className="detail-row"><h2>Author</h2><h4>{book.author}</h4></div>
                    <div className="detail-row"><h2>Subject</h2><h4>{book.subject}</h4></div>
                    <div className="detail-row"><h2>year</h2><h4>{book.year}</h4></div>
                    <div className="detail-row"><h2>publisher</h2><h4>{book.publisher}</h4></div>
                    <div className="detail-row"><h2>Price</h2><h4>{book.price.toFixed(2)} lv.</h4></div>
                </div>
                <div className="book-description">
                    <div className="description-header"><h2>Description</h2></div>
                    {book.description}
                </div>
            </div>
        );
    }

    static bookService = new BookService();
    
    componentDidMount() {
        const id = this.props.match.params.id;
        const token = sessionStorage.getItem("token");

        BookDetails.bookService.getDetails(id, token)
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

export default BookDetails;