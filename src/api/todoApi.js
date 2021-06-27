import axiosClient from './axiosClient';

const todoApi = {
    getAll(params) {
        const url = '/todos';
        return axiosClient.get(url, { params: params }); //{params}
    },

    get(id) {
        const url = `/todos/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = '/todos';
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/todos/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/todos/${id}`;
        return axiosClient.delete(url);
    },
};

export default todoApi;
