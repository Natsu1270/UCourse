import CourseActionTypes from './course.types'

const initState = {
    courses: {},
    isFetching: false,
    errorResponse: null,
    courseDetail: null,
};

const courseReducer = (state = initState, action) => {
    switch (action.type) {
        case CourseActionTypes.FETCH_COURSES_START:
        case CourseActionTypes.FETCH_COURSE_DETAIL_START:
        case CourseActionTypes.BUY_COURSE_START:
            return {
                ...state,
                isFetching: true
            };

        case CourseActionTypes.BUY_COURSE_SUCCESS:
            return {
                ...state,
                isFetching: false
            }
        case CourseActionTypes.FETCH_COURSES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                courses: action.payload
            };
        case CourseActionTypes.FETCH_COURSE_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                courseDetail: action.payload
            };
        case CourseActionTypes.FETCH_COURSES_FAIL:
        case CourseActionTypes.FETCH_COURSE_DETAIL_FAIL:
        case CourseActionTypes.BUY_COURSE_FAIL:
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