import axios from 'axios'

const PROFILE_API_URL = '/api/profile'

export const getProfileAPI = (token) => {
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        method: 'GET',
        url: `${PROFILE_API_URL}`
    })
}

export const updateProfileAPI = (params) => {
    const { token } = params
    return axios.request({
        headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
        method: 'PATCH',
        url: `${PROFILE_API_URL}/`,
        data: params
    })
}

export const getListTeacherAPI = () => {
    return axios.request(
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            url: `${PROFILE_API_URL}/teachers`,
        }
    )
}

export const getPublicUserProfileAPI = (username, token) => {
    const headers = token ?
        { 'Content-Type': 'application/json', 'Authorization': `token ${token}` } :
        { 'Content-Type': 'application/json' }
    return axios.request(
        {
            headers,
            method: 'GET',
            url: `${PROFILE_API_URL}/${username}`,
        }
    )
}