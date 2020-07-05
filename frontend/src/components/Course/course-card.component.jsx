import React from 'react'
import {Card} from 'antd'
import CourseCardSub from "./course-card-sub.component";

const CourseCard = ({course, onClick}) => {
    const coverStyle = {
        width: '100%',
        height: '17rem',
        minWidth: '25rem',
        backgroundImage: `url(${course.icon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    };
    const {Meta} = Card;
    return (
        <Card
            className="course-card"
            onClick={onClick}
            hoverable
            style={{ borderRadius: '1.3rem', overflow: 'hidden'}}
            cover={<div style={coverStyle}/>}
        >
            <Meta title={course.title} description={
                <CourseCardSub
                    homeNum={course.course_home_count}
                    level={course.level}
                    open_date={course.open_date}
                />}
            />
        </Card>
    )
}

export default CourseCard