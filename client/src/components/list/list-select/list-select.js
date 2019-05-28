import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ListService from '../../../services/list-service';

class ListSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lists: [],
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.giveListId = this.giveListId.bind(this);
    }

    static listServise = new ListService();

    componentWillMount() {
        const token = sessionStorage.getItem("token");

        ListSelect.listServise.getMyLists(token)
            .then(data => {
                if (data.lists) {
                    this.setState({ lists: data.lists });
                } else {
                    toast.error(data.message);
                }
            })
            .catch(err => toast.error(err));
    }

    handleChange(evt) {
        this.setState({
            value: evt.target.value
        });
    }

    giveListId() {
        return this.state.value;
    }

    render() {
        return (
            <select className="list-select" value={this.state.value} onChange={this.handleChange}>
                <option value="" disabled>Choose a list</option>
                {
                    this.state.lists.map(list => <option key={list._id} value={list._id}>{list.title}</option>)
                }
            </select>
        );
    }
}

export default ListSelect;