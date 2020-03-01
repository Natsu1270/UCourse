import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects';
import AuthActionTypes from './auth.types';
import * as AuthAction from './auth.actions'
import * as AuthService from '../../api/auth.services'
import {
    auth,
    googleProvider,
    getCurrentUser
} from '../../firebase/firebase.utils';

// load user saga
export function* loadUser({ payload }) {
    try {
        if (payload) {
            let { data } = yield call(AuthService.loadUserAPI, payload)
            yield put(AuthAction.loadUserSuccess(data))
        } else {
            const userAuth = yield getCurrentUser()
            userAuth ?
                yield put(AuthAction.loadUserSuccess(userAuth)) :
                yield put(AuthAction.loadUserGoogleEmpty())
        }
    } catch (err) {
        yield put(AuthAction.loadUserFail(err.message))
    }
}

export function* onLoadUser() {
    yield takeEvery(AuthActionTypes.LOAD_USER_START, loadUser)
}


export function* register({ payload: { username, email, password } }) {
    try {
        let { data } = yield call(AuthService.registerAPI, { username, email, password })
        localStorage.setItem('token', data.data.token)
        yield put(AuthAction.registerSuccess(data))
    } catch (err) {
        yield put(AuthAction.registerFail(err))
    }
}

export function* onRegister() {
    yield takeLatest(AuthActionTypes.REGISTER_START, register)
}


// login saga
export function* login({ payload: { username, password } }) {
    try {
        let { data } = yield call(AuthService.loginAPI, { username, password })
        localStorage.setItem('token', data.data.token)
        yield put(AuthAction.loginSuccess(data))
    } catch (err) {
        yield put(AuthAction.loginFail(err))
    }
}

export function* onLogin() {
    yield takeLatest(AuthActionTypes.LOGIN_START, login);
}


// logout
export function* logout({ payload }) {
    try {
        if (payload) {
            yield call(AuthService.logoutAPI, payload)
            localStorage.removeItem('token')
        } else {
            yield auth.signOut()
        }
        yield put(AuthAction.logoutSuccess())
    } catch (err) {
        yield put(AuthAction.logoutFail(err))
    }
}

export function* onLogout() {
    yield takeLatest(AuthActionTypes.LOGOUT_START, logout)
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield put(AuthAction.googleSignInSuccess(user))
    } catch (err) {
        yield put(AuthAction.loginFail(err))
    }
}

export function* onSignInWithGoogle() {
    yield takeLatest(AuthActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* authSaga() {
    yield all([
        call(onLogin),
        call(onLoadUser),
        call(onLogout),
        call(onRegister),
        call(onSignInWithGoogle),
    ])
}
