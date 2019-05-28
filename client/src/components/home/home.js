import React from 'react';
import { toast } from 'react-toastify'; 
import ListService from '../../services/list-service';
import './home.css';

import BookAll from '../book/book-all/book-all';
import ListSelect from '../list/list-select/list-select';

const Home = (props) => {
    const listRef = React.createRef();

    function getListId() {
        return listRef.current.giveListId();
    }

    function addToList(bookId) {
        const listId = getListId();

        if (!listId) {
            toast.error("Select a valid list!");
        } else {
            const listService = new ListService();
            const token = sessionStorage.getItem("token");
            const data = { listId, bookId };

            listService.addBookToList(token, data)
                .then(data => {
                    if (data.list) {
                        toast.success(data.message);
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(err => toast.error(err));
        }
    }

    return (
        <div className="home">
            {
                sessionStorage.getItem("username") 
                    ? <ListSelect ref={listRef}/> 
                    : null
            }
            <BookAll {...props} addToList={addToList}/>
        </div>
    );
}

export default Home;