import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ListService from '../../../services/list-service';
import '../../form.css';

class ListCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    static listService = new ListService();

    handleChange(evt) {
        this.setState({
            title: evt.target.value
        });
    }

    handleForm(evt) {
        evt.preventDefault();

        const token = sessionStorage.getItem("token");

        ListCreate.listService.create(token, this.state)
            .then(data => {
                if (data.list) {
                    toast.success(data.message);
                    this.props.history.push("/");
                } else {
                    if (data.errors) {
                        Object.values(data.errors).forEach(error => toast.error(error));
                    } else {
                        toast.error(data.message);
                    }
                }
            })
            .catch(err => toast.error(err));
    }

    render() {
        return (
            <div className="form">
                <h1>Create List</h1>
                <form onSubmit={this.handleForm}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                    <button type={"submit"}>Create</button>
                </form>
            </div>
        );
    }
}

export default ListCreate;