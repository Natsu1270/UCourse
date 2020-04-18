import React from 'react'
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { formatDate } from "../../utils/text.utils";
import Constants from "../../constants";

const CourseDetailBanner = ({ course, courseDetail, teachers }) => {
    const s = {
        background: `linear-gradient(
          rgba(0, 0, 0, 0.2), 
          rgba(0, 0, 0, 0.8)
        ),
        url(${course.icon}) no-repeat center center / cover`,

    };
    return (
        <section style={s} className="pd-5 section-course-banner" id="cs-course-banner" >
            <div className="course-banner d-flex justify-content-start" >
                <div className="course-detail">
                    <h4 className="text--sub__smaller text-white">
                        Khóa học
                    </h4>
                    <h1 className="text--main text--main__bigger text-white">
                        {courseDetail.verbose_name}
                    </h1>
                    <p className="course-description text--sub text--sub__bigger mt-4">
                        {courseDetail.short_description}
                    </p>
                    <div className="d-flex enroll-area mt-5">
                        <Link to="" className="cs-btn cs-btn--animated cs-btn--banner cs-btn--white">
                            Đăng ký học
                        </Link>
                        <div className="course-info">
                            <p className="text-white text--sub">
                                Khoá học bắt đầu vào : {formatDate(course.open_date, Constants.MMM_Do_YYYY)}
                            </p>
                            <p className="text-white text--sub">
                                Giảng viên : {teachers[0] ? teachers[0].fullname : ''}
                            </p>
                            <p className="text-white text--sub">
                                Điểm đánh giá: {course.rate_score}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
};

export default CourseDetailBanner