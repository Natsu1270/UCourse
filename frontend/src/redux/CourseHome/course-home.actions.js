import CourseHomeTypes from "./course-home.types";

export const registerCourseStart = (params) => ({
    type: CourseHomeTypes.REGISTER_COURSE_START,
    payload: params
});

export const registerCourseSuccess = () => ({
    type: CourseHomeTypes.REGISTER_COURSE_SUCCESS
});

export const registerCourseFail = (err) => ({
    type: CourseHomeTypes.REGISTER_COURSE_FAIL,
    payload: err
});

export const unRegisterCourseStart = (params) => ({
    type: CourseHomeTypes.UNREGISTER_COURSE_START,
    payload: params
});

export const unRegisterCourseSuccess = () => ({
    type: CourseHomeTypes.UNREGISTER_COURSE_SUCCESS
});

export const unRegisterCourseFail = (err) => ({
    type: CourseHomeTypes.UNREGISTER_COURSE_FAIL,
    payload: err
});

export const fetchMyCoursesStart = (params) => ({
    type: CourseHomeTypes.FETCH_MY_COURSES_START,
    payload: params
});

export const fetchMyCoursesSuccess = (courseHomes) => ({
    type: CourseHomeTypes.FETCH_MY_COURSES_SUCCESS,
    payload: courseHomes
});

export const fetchMyCoursesFail = (err) => ({
    type: CourseHomeTypes.FETCH_MY_COURSES_FAIL,
    payload: err
});

export const getCourseHomeDetailStart = (params) => ({
    type: CourseHomeTypes.GET_COURSE_HOME_DETAIL_START,
    payload: params
});

export const getCourseHomeDetailSuccess = (courseHomeDetail) => ({
    type: CourseHomeTypes.GET_COURSE_HOME_DETAIL_SUCCESS,
    payload: courseHomeDetail
});

export const getCourseHomeDetailFail = (err) => ({
    type: CourseHomeTypes.FETCH_MY_COURSES_FAIL,
    payload: err
});

export const getCourseHomeShowStart = (params) => ({
    type: CourseHomeTypes.GET_COURSE_HOME_SHOW_START,
    payload: params
});

export const getCourseHomeShowSuccess = (courseHomeShow) => ({
    type: CourseHomeTypes.GET_COURSE_HOME_SHOW_SUCCESS,
    payload: courseHomeShow
});

export const getCourseHomeShowFail = (err) => ({
    type: CourseHomeTypes.GET_COURSE_HOME_SHOW_FAIL,
    payload: err
});

export const getCourseHomeShowDetailStart = (params) => ({
    type: CourseHomeTypes.GET_COURSE_HOME_SHOW_DETAIL_START,
    payload: params
});

export const getCourseHomeShowDetailSuccess = (courseHomeShowDetail) => ({
    type: CourseHomeTypes.GET_COURSE_HOME_SHOW_DETAIL_SUCCESS,
    payload: courseHomeShowDetail
});

export const getCourseHomeShowDetailFail = (err) => ({
    type: CourseHomeTypes.GET_COURSE_HOME_SHOW_DETAIL_FAIL,
    payload: err
});