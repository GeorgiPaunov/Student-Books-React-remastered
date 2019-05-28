import React from 'react';

const BookItem = (props) => {
    const username = sessionStorage.getItem("username");
    const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));

    function getDetails(id) {
        props.history.push(`/books/details/${id}`);
    }

    function getEdit(id) {
        props.history.push(`/books/edit/${id}`);
    }

    function getDelete(id) {
        props.history.push(`/books/delete/${id}`);
    }

    return (
        <li className="book">
            <h2>{props.title}</h2>
            <h2>{props.grade}. grade</h2>
            <img src={props.imageUrl} alt=""/>
            {
                username
                    ? <span>
                        <div className="inner">
                            <button onClick={() => getDetails(props._id)}>Details</button>
                        </div>
                        <div className="inner">
                            <button onClick={() => props.addToList(props._id)}>Add</button>
                        </div>
                      </span>
                    : null
            }
            {
                isAdmin
                    ? <span>
                         <div className="inner">
                            <button id="edit" onClick={() => getEdit(props._id)}>Edit</button>
                        </div>
                        <div className="inner">
                            <button id="delete" onClick={() => getDelete(props._id)}>Delete</button>
                        </div>
                      </span>
                    : null
            }
        </li>
    );
}

export default BookItem;