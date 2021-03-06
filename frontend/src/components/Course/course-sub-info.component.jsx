import React from 'react'
import Constants from "../../constants";
import { Tag } from 'antd';

const CourseSubInfo = ({ class_count, level, viewCount, isBought, rate }) => {


    return (
        <ul className="search-course-card__body--content--info">
            <li className="search-course-card__body--content--info__item item-author">
                <span className="text--const">
                    Số lượng: {class_count} lớp
                </span>
            </li>
            <li className="search-course-card__body--content--info__item">
                <span className="text--const">
                    Cấp độ: {Constants.COURSE_LEVEL_TYPES[level]}
                </span>
            </li>
            <li className="search-course-card__body--content--info__item">
                <span className="text--const">
                    {viewCount} Lượt xem
                </span>
            </li>
            <li className="search-course-card__body--content--info__item">
                <span className="text--const">
                    {isBought ? <Tag color="#f50">Đã sở hữu</Tag> : null}
                </span>
            </li>
            {/* <li className="search-course-card__body--content--info__item">
                <span className="text--const">
                    {rate}
                </span>
            </li> */}
        </ul>
    )
}

export default CourseSubInfo