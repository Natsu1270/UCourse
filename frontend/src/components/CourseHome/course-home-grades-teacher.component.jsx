import React, { useState, useEffect } from 'react'
import { message, Tabs, Table, Skeleton, Menu, Button, Modal, InputNumber, Space, Avatar, Tag, Row, Col, Switch } from 'antd'
import Constants from '../../constants'

import { getAllStudentGradesByCourseHomeAPI, updateStudentCourseHomeGrade } from '../../api/grades.services'

import ExamGrades from '../Grade/exam-grades.component'
import AssignmentGrades from '../Grade/assignment-grades.component'
import FinalGradesTable from './Grades/final-grades-table.component'

const { TabPane } = Tabs
const { SubMenu } = Menu

const CourseHomeGradesTeacher = ({ token, courseHomeId, students }) => {

    const [loading, setLoading] = useState(true)
    const [assignments, setAssignments] = useState({})
    const [exams, setExams] = useState({})
    const [studentCourseHomes, setStudentCourseHomes] = useState([])
    const [editScore, setEditScore] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [editFinal, setEditFinal] = useState(null)
    const [isPassSwitch, setSwitch] = useState(false)


    const getStudentGrades = async () => {
        setLoading(true)
        try {
            const { data } = await getAllStudentGradesByCourseHomeAPI({ token, courseHomeId })
            setExams(data.student_exams)
            setAssignments(data.student_assignments)
            setStudentCourseHomes(data.student_course_homes)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token && courseHomeId) getStudentGrades()
    }, [token, courseHomeId])

    const updateStudentFinalGrade = async (grade, isQualified, id) => {
        setLoading(true)
        const data = { token, grade, isQualified, studentCourseHomeId: id }
        try {
            const result = await updateStudentCourseHomeGrade(data)
            message.success("Cập nhật thành công", 1.5, () => window.location.reload())
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setLoading(false)
        }
    }

    const modalClose = () => {
        setShowModal(false)
        setEditScore(null)
        setEditFinal(null)
    }




    return (
        <section className="section-5 page-2">
            <h3 className="text--main mb-5">
                Tổng hợp điểm
            </h3>
            <Tabs defaultActiveKey="3">
                <TabPane tab="Bài kiểm tra" key="1">
                    <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                        <ExamGrades exams={exams} />
                    </Skeleton>
                </TabPane>
                <TabPane tab="Bài assignment" key="2">
                    <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
                        <AssignmentGrades assignments={assignments} token={token} />
                    </Skeleton>
                </TabPane>

                <TabPane tab="Điểm tổng kết" key="3">
                    <h3 className="text--main">Danh sách điểm tổng kết tạm tính</h3>
                    <FinalGradesTable
                        loadingData={loading}
                        exams={exams} assignments={assignments} token={token}
                        setEditFinal={setEditFinal} setShowModal={setShowModal} students={students} studentCourseHomes={studentCourseHomes}
                    />
                </TabPane>

            </Tabs>
            <Modal
                title="Nhập điểm"
                visible={showModal}
                onCancel={modalClose}
                footer={[
                    <Button key={1} type="danger" onClick={modalClose}>
                        Hủy
                    </Button>,
                ]}
                style={{ background: 'white', paddingBottom: '0', textAlign: 'center' }}>

                <Row justify="center">
                    <Col span={12}>
                        <h3 className="text-center mb-5">Nhập điểm: </h3>
                    </Col>
                    <Col span={12}>
                        <InputNumber style={{ width: '100%' }} value={editScore} onChange={(e) => setEditScore(e)} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={12}>
                        <h3 className="text-center mb-5">Đủ điều kiện qua môn: </h3>
                    </Col>
                    <Col span={12}>
                        <Switch onChange={(checked) => setSwitch(checked)} />
                    </Col>

                </Row>
                <Button
                    type="primary"
                    loading={loading}
                    onClick={() => updateStudentFinalGrade(editScore, isPassSwitch, editFinal)}>
                    Cập nhật
                    </Button>
            </Modal>
        </section>
    )
};

export default CourseHomeGradesTeacher