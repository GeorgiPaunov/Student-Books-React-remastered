import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';

import BookItem from './book-item';

import BookService from '../../../services/book-service';

class BookAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            isLoading: true
        };
    }

    render() {
        if (this.state.isLoading) {
            return <h2>Loading...</h2>;
        }

        const { books } = this.state;

        return (
            <Fragment>
                <h1>All Student Books</h1>
                {
                    books.length
                        ?
                        <ul className="books">
                            {
                                books.map(book => <BookItem key={book._id} {...this.props} {...book}/>)
                            }
                        </ul>
                        :
                        <h3>There are currently no Student Books</h3>
                }
            </Fragment>
        );
    }

    static bookService = new BookService();

    componentDidMount() {
        BookAll.bookService.getAllBooks()
            .then(data => {
                const books = data.books.sort((a, b) => (
                    a.grade - b.grade ||
                    a.subject.localeCompare(b.subject) ||
                    a.publisher.localeCompare(b.publisher)
                ));
                
                this.setState({ books, isLoading: false });
            })
            .catch(err => toast.error(err));
    }
}

export default BookAll;