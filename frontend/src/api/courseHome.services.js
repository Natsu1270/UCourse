import axios from 'axios'

const API_URL = '/api/course-home';


export const registerCourseAPI = ({ course_id, token, class_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/register`,
        data: { course_id, class_id }
    })
};

export const unRegisterCourseAPI = ({ token, class_id }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'POST',
        url: `${API_URL}/unregister`,
        data: { class_id }
    })
};


export const fetchMyCourseHomesAPI = ({ token }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/my`,
    })
};

export const getCourseHomeDetailAPI = ({ slug, token }) => {
    return axios.request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
        },
        method: 'GET',
        url: `${API_URL}/${slug}`
    })
}


export const getCourseHomeShowAPI = ({ token, course_id }) => {

    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'GET',
        url: `${API_URL}/show/class`,
        params: {
            course_id
        }
    })
}

export const getCourseHomeDetailShowAPI = ({ token, slug }) => {
    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'GET',
        url: `${API_URL}/show/class/${slug}`,
    })
}


export const checkClassOwnership = ({ token, slug }) => {

    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request({
        headers,
        method: 'POST',
        url: `${API_URL}/check`,
        data: {
            slug
        }
    })
}

export const updateCourseHomeInfo = ({ token, slug, info }) => {


    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'PUT',
        url: `${API_URL}/${slug}`,
        data: {
            course_info: info
        }
    })
}

export const createLearningTopic = (data) => {
    const { token, name, info, course_home, code } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'POST',
        url: `${API_URL}/learning_topic/create`,
        data: {
            name, info, course_home, code
        }
    })
}

export const editLearningTopic = (data) => {
    const { token, name, info, id } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'PUT',
        url: `${API_URL}/learning_topic/${id}`,
        data: {
            name, info
        }
    })
}

export const deleteLearningTopic = (data) => {
    const { token, id } = data
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `token ${token}` },
        method: 'DELETE',
        url: `${API_URL}/learning_topic/${id}`
    })
}
