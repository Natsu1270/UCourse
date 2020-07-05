import React from 'react'
import {useHistory} from 'react-router-dom'
import {Collapse} from 'antd'
import CourseCard from "../Course/course-card.component";

const ProgramDetailComponents = ({courses}) => {

    const history = useHistory()

    const {Panel} = Collapse
    const bgCourses = courses.filter(course => course.level === 'Beginner')
    const mdCourses = courses.filter(course => course.level === 'Intermediate')
    const adCourses = courses.filter(course => course.level === 'Advanced')

    return (
        <section className="mt-10 section-course-components" id="cs-course-components">
            <div className="section-course-components__content">
                <h2 className="text--main section-header" id="cs-course-overview">
                    Các khóa học của chương trình
                </h2>
                <Collapse bordered={false}>
                    {
                        bgCourses.length ? (
                            <Panel key="1" style={{fontSize: '2rem'}} header="Khóa cơ bản" className="white-bg">
                                <div className="dis-flex-start pl-5">
                                    {
                                        bgCourses.map(course => <div className="mr-5" key={course.code}>
                                            <CourseCard
                                                onClick={()=>history.push(`/courses/${course.slug}`)}
                                                course={course}/>
                                        </div>)
                                    }
                                </div>
                            </Panel>
                        ) : <span/>
                    }
                    {
                        mdCourses.length ? (
                            <Panel key="2" style={{fontSize: '2rem'}} header="Khóa trung cấp" className="white-bg">
                                {
                                    <div className="dis-flex-start pl-5">
                                        {
                                            mdCourses.map(course => <div className="mr-5">
                                                <CourseCard course={course}/>
                                            </div>)
                                        }
                                    </div>
                                }
                            </Panel>
                        ) : <span/>
                    }
                    {
                        adCourses.length ? (
                            <Panel key="3" style={{fontSize: '2rem'}} header="Khóa nâng cao" className="white-bg">
                                {
                                    <div className="dis-flex-start pl-5">
                                        {
                                            adCourses.map(course => <div className="mr-5">
                                                <CourseCard course={course}/>
                                            </div>)
                                        }
                                    </div>
                                }
                            </Panel>
                        ) : <span/>
                    }
                </Collapse>
            </div>
        </section>
    )

}

export default ProgramDetailComponents