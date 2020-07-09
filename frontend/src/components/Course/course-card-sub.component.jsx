import React from 'react'
import { SmileTwoTone, MehTwoTone, FrownTwoTone } from '@ant-design/icons'

const CourseCardSub = ({ title, homeNum, level, open_date }) => {

    const renderLevel = () => {
        if (level === 'Beginner') {
            return (<SmileTwoTone twoToneColor='#52c41a' />)
        } else if (level === 'Intermediate') {
            return (<MehTwoTone />)
        } else {
            return (<FrownTwoTone twoToneColor='#eb2f96' />)
        }
    };

    return (
        <div className="course-card-sub">
            <div className="course-card-sub__title text--sub__bigger2">{title}</div>
            <div className="course-card-sub__teacher">
                {homeNum === 0 ? "Chưa có lớp" : homeNum + " lớp"}
            </div>
            <div className="course-card-sub__others dis-flex-start">
                <span className="course-card-sub__others--item">
                    {renderLevel()} {level}
                </span>
                <span className="course-card-sub__others--item">
                    {open_date}
                </span>
            </div>
        </div>
    )
}

export default CourseCardSub