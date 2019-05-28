import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ListService from '../../../services/list-service';
import './list-all.css';

import ListTable from './list-table';

class ListAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            isLoading: true
        };

        this.getAllLists = this.getAllLists.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    static listService = new ListService();

    getAllLists() {
        const token = sessionStorage.getItem("token");

        ListAll.listService.getMyLists(token)
            .then(data => {
                if (data.lists) {
                    this.setState({ lists: data.lists, isLoading: false });
                } else {
                    this.props.history.push("/");
                    toast.error(data.message);
                }
            })
            .catch(err => toast.error(err));
    }

    deleteList(id) {
        const token = sessionStorage.getItem("token");

        ListAll.listService.delete(id, token)
            .then(data => {
                if (data.list) {
                    toast.success(data.message);
                    this.getAllLists();
                }
            })
            .catch(err => toast.error(err));
    }

    render() {
        if (this.state.isLoading) {
            return <h2>Loading...</h2>
        }

        const { lists } = this.state;

        return (
            <div className="table">
                <h1>Your lists</h1>
                {
                    lists.length 
                        ? <ListTable {...this.props} lists={this.state.lists} deleteList={this.deleteList}/> 
                        : <h2>You have no lists</h2>
                }
            </div>
        );
    }

    componentDidMount() {
        this.getAllLists();
    }
}

export default ListAll;