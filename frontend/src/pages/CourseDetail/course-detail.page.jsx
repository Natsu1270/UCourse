import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom'

import {fetchCourseDetailStart} from '../../redux/Course/course.actions'
import {Breadcrumb, Spin} from 'antd'
import {HomeOutlined} from '@ant-design/icons'
import {createStructuredSelector} from "reselect";
import {courseDetailSelector, errorResponseSelector, isFetchingSelector} from "../../redux/Course/course.selects";
import {slugifyString} from "../../utils/text.utils";
import CourseDetailBanner from "../../components/Banners/course-detail-banner.component";
import CourseDetailTab from "../../components/Course/course-detail-tab.component";
import CourseDetailOverview from "../../components/Course/course-detail-overview.component";
import CourseDetailComponents from "../../components/Course/course-detail-components.component";
import CourseDetailTeacher from "../../components/Course/course-detail-teacher.component";
import CourseDetailReview from "../../components/Course/course-detail-review.component";
import CourseDetailRelated from "../../components/Course/course-detail-related.component";

const CourseDetail = () => {
    const dispatch = useDispatch();
    const {slug} = useParams();
    useEffect(() => {
        dispatch(fetchCourseDetailStart(slug))
    }, []);
    const {course, isFetching, errorResponse} = useSelector(createStructuredSelector({
        course: courseDetailSelector,
        isFetching: isFetchingSelector,
        errorResponse: errorResponseSelector
    }));


    return (
        <div className="page section-10 course-detail">
            {
                course ? (<div className="course-detail">
                    <Breadcrumb separator='>' className="course-detail__breadcrumb">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined/>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/field">
                                Field
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href={`/field/${slugifyString(course.field)}`}>
                                {course.field}
                            </Breadcrumb.Item>
                    </Breadcrumb>

                    <CourseDetailBanner course={course} />

                    <CourseDetailTab course={course} />

                    <CourseDetailOverview course={course} />

                    <CourseDetailComponents course={course} />

                    <CourseDetailTeacher course={course} />

                    <CourseDetailReview course={course} />

                    <CourseDetailRelated course={course} />

                </div>) : <Spin/>
            }
        </div>
    )
};

export default CourseDetail