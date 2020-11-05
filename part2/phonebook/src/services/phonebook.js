import axios from 'axios';

const url = '/api/persons';

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

const del = id => {
    const req = axios.delete(`${url}/${id}`);
    return req.then(resp => {
        return resp.data;
    });
};

const update = (obj, id) => {
    const req = axios.put(`${url}/${id}`, obj);
    return req.then(resp => {
        return resp.data;
    });
};

export default {
    add,
    list,
    del,
    update
}
