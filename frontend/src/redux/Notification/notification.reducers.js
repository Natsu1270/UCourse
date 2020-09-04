import NotificationActionTypes from './notification.types'

const initState = {
    notifications: {},
    isFetching: false,
    errorResponse: null,
};

const courseReducer = (state = initState, action) => {
    switch (action.type) {
        case NotificationActionTypes.GET_MY_NOTIFICATIONS_START:
            return {
                ...state,
                isFetching: true
            };

        case NotificationActionTypes.GET_MY_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                notifications: action.payload
            };
        case NotificationActionTypes.GET_MY_NOTIFICATIONS_FAIL:
            return {
                ...state,
                isFetching: false,
                errorResponse: action.payload
            };

        default:
            return state
    }
};

export default courseReducer