import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ListService from '../../../services/list-service';
import './list-details.css';

import ListItem from './list-item';

class ListDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: {},
            isLoading: true
        };

        this.getList = this.getList.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
    }

    static listService = new ListService();

    getList() {
        const id = this.props.match.params.id;
        const token = sessionStorage.getItem("token");

        ListDetails.listService.getDetails(id, token)
            .then(data => {
                if (data.list) {
                    this.setState({ list: data.list, isLoading: false });
                } else {
                    this.props.history.push("/");
                    toast.error(data.message);
                }
            })
            .catch(err => toast.error(err));
    }

    removeFromList(bookId) {
        const token = sessionStorage.getItem("token");
        const listId = this.props.match.params.id;
        const data = { listId, bookId };

        ListDetails.listService.removeBookFromList(token, data)
            .then(data => {
                if (data.list) {
                    toast.success(data.message);
                    this.getList();
                } else {
                    toast.error(data.message);
                }
            })
            .catch(err => toast.error(err));
    }

    render() {
        const { list } = this.state;

        if (this.state.isLoading) {
            return <h2>Loading...</h2>;
        }

        if (!list.studentBooks.length) {
            return <h3>There are currently no student books in this list</h3>;
        }

        return(
            <div className="list">
                <h1>{list.title}</h1>
                <ul className="books">
                    {
                        list.studentBooks.sort((a, b) => a.subject.localeCompare(b.subject) || a.grade - b.grade)
                            .map(book => <ListItem key={book._id} {...book} removeFromList={this.removeFromList}/>)
                    }
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.getList();
    }
}

export default ListDetails;