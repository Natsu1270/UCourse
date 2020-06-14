import React from "react";
import {useHistory} from 'react-router-dom'
import SearchCourseItem from "./search-course-item.component";


const SearchCourses = ({courses}) => {
    const history = useHistory();
    return (
        <div className="search-result--c">
            {
                courses.length ? (
                    <div className="search-result--c">
                        <h1 className="search-result--title">Khóa học <span
                            className="search-result--title__small">  {courses.length} Kết quả </span>
                        </h1>
                        <div className="search-result--courses">
                            {
                                courses.map(course => {
                                    return (
                                        <SearchCourseItem
                                            onClick = {() =>
                                            {
                                                history.push(`/courses/${course.slug}`)
                                            }}
                                            key={course.code}
                                            title={course.title}
                                            img={course.icon}
                                            class_count={course.course_home_count}
                                            level={course.level}
                                            open_date={1}
                                            rate={1}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : <span/>
            }
        </div>)
};


export default SearchCourses