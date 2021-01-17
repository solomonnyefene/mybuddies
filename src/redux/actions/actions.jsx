import axios from 'axios';
import * as actionTypes from  './ActionType'
import {message} from 'antd'

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        // 'token': sessionStorage.getItem('token'),
        // 'Authorization':'Token' + ' ' + sessionStorage.getItem('token')
    }
};

export const logout = () => ({
    type: actionTypes.LOGOUT
});
export const searchBuddy = (text) => ({
    type: actionTypes.SEARCH_BUDDY,
     payload:text
});
export const login = (user) => ({
    type: actionTypes.LOGIN,
    payload:user
});
export const persistState = () => ({
    type: actionTypes.PERSIST_STATE
});

export function submitProfile(buddy) {
    return {
        type: actionTypes.SUBMIT_BUDDY,
        payload: new Promise((resolve, reject) => {
            axios.post('https://echo-ll4dnfnzkq-uc.a.run.app/echo', {buddy})
                .then(response => resolve(response.data))
                .then(response => message.success('Buddy added successfully'))
                .catch(error => reject(error))
        })
    }
}
export function getData() {
    return {
        type: actionTypes.GET_DATA,
        payload: new Promise((resolve, reject) => {
            axios.get('https://echo-ll4dnfnzkq-uc.a.run.app/data')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        })
    }
}


export function getCourses(payload) {
    return {
        type: 'GET_COURSES',
        payload: new Promise((resolve, reject) => {
            axios.get('https://api.myqtab.com/courses')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        })
    }
}
