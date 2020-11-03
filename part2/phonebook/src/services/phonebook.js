import axios from 'axios';

const url = 'http://localhost:3001/persons';
const add = (obj) => {
    const req = axios.post(url, obj);
    return req.then(resp => {
        return resp.data;
    });
};

const list = () => {
    const req = axios.get(url);
    return req.then(resp => {
        return resp.data;
    });
};

export default {
    add,
    list
}
