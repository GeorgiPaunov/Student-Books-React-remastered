import { get, post, update, remove } from "../ajax/crud";

class ListService {
    constructor() {
        this.baseUrl = "http://localhost:9999/lists";
        this.myListsUrl = `${this.baseUrl}/myLists`;
        this.detailsUrl = `${this.baseUrl}/details/`;
        this.createListUrl = `${this.baseUrl}/create`;
        this.deleteListUrl = `${this.baseUrl}/delete/`;
        this.addToListUrl = `${this.baseUrl}/add`;
        this.removeFromListUrl = `${this.baseUrl}/remove`;
    }

    getMyLists(token) {
        return get(this.myListsUrl, token);
    }

    getDetails(id, token) {
        return get(this.detailsUrl + id, token);
    }

    create(token, list) {
        return post(this.createListUrl, token, list);
    }

    delete(id, token) {
        return remove(this.deleteListUrl + id, token);
    }

    addBookToList(token, data) {
        return update(this.addToListUrl, token, data);
    }

    removeBookFromList(token, data) {
        return update(this.removeFromListUrl, token, data);
    }
}

export default ListService;