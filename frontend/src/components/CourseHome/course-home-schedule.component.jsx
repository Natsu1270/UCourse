import React, { useState, useEffect } from 'react'

import CourseHomeTopic from "./course-home-topic.component";
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import moment from 'moment'
import {
    createLearningTopic, editLearningTopic,
    createTopicAsset, editTopicAsset
} from '../../api/courseHome.services'

import {
    Skeleton, Button, Modal, Row,
    Col, Form, Upload, Input, Radio,
    message, Drawer, Select, InputNumber,
    DatePicker
} from "antd";

import { UploadOutlined } from '@ant-design/icons';
import slugify from 'slugify';
import { deleteLearningTopic } from '../../api/courseHome.services';
import { disabledDate, disabledDateTime, disabledRangeTime } from '../../utils/date.utils'
import { createExam, editExam } from '../../api/exam.services';

const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const CourseHomeSchedule = ({ topics, isLoading, userRole, token, course }) => {

    const [showModal, setShowModal] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false)
    const [info, setInfo] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [learningTopics, setTopic] = useState([])
    const [isDeleting, setDeleting] = useState(false)
    const [editingTopic, setEditingTopic] = useState(null)
    const [isCreateTopic, setIsCreateTopic] = useState(true)
    const [fileList, setFile] = useState([])
    const [isEditAsset, setIsEditAsset] = useState(false)
    const [assetName, setAssetName] = useState("")
    const [assetInfo, setAssetInfo] = useState("")
    const [assetFileType, setAssetFileType] = useState("")
    const [assetFile, setAssetFile] = useState(null)
    const [assetId, setAssetId] = useState(null)
    const [editingQuize, setEditingQuize] = useState({})


    useEffect(() => {
        if (topics && topics.length > 0) {
            setTopic(topics)
        }
    }, [topics])


    const props = {
        onRemove: file => {
            setFile([])
        },
        beforeUpload: file => {
            setFile([file])
            return false;
        },
        fileList,
    };

    const onFinish = values => {
        if (editingTopic === null) {
            createTopic(values.name, info)
        } else {
            editTopic(values.name, info, editingTopic)
        }
    };

    const submitCreateAsset = values => {
        createAsset(values)
    }

    const createAsset = async (values) => {
        setLoading(true)
        const { assetName: name, description: info, fileType: file_type } = values
        const data = {
            token, learning_topic: editingTopic, name, info, file_type, file: fileList[0]
        }
        const editData = {
            token, id: assetId, name, info, file_type, file: fileList[0]
        }
        try {

            const result = !isEditAsset ? await createTopicAsset(data) : await editTopicAsset(editData)
            const msg = !isEditAsset ? "Thêm bài giảng thành công" : "Chỉnh sửa bài giảng thành công"
            message.success(msg, 1.5, () => window.location.reload())
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const data = { token, id: id }
        setDeleting(true)
        try {
            const result = await deleteLearningTopic(data)
            const updateTopics = learningTopics.filter(topic => topic.id != id)
            setTopic(updateTopics)
            message.success("Xoá thành công")
        } catch (err) {
            message.error(err.message)
        }
        setDeleting(false)
    }

    const createTopic = async (name, info) => {
        setLoading(true)
        const data = {
            token, course_home: course, name, info, code: slugify(name)
        }
        try {
            const result = await createLearningTopic(data)
            const newTopic = result.data.data
            learningTopics.push(newTopic)
            setTopic(learningTopics)
            message.success("Tạo mới chủ đề học thành công")
            setShowModal(false)
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const triggerEdit = (id) => {
        setEditingTopic(id)
        const topicToEdit = learningTopics.find(topic => topic.id === id)
        setInfo(topicToEdit.info)
        setName(topicToEdit.name)
        setIsCreateTopic(true)
        setShowModal(true)
    }

    const editTopic = async (name, info, id) => {
        setLoading(true)
        const data = {
            token, name, info, id
        }

        try {
            const result = await editLearningTopic(data)
            const topicIndex = learningTopics.findIndex(t => t.id === id)
            const newTopics = [...learningTopics]
            newTopics[topicIndex] = result.data.data
            setTopic(newTopics)
            message.success("Cập nhật chủ đề học thành công")
            setShowModal(false)
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)
        setEditingTopic(null)
        setName('')
        setInfo('')
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const triggerCreateAsset = (topicId) => {
        setIsCreateTopic(false)
        setShowModal(true)
        setEditingTopic(topicId)
    }

    const triggerEditAsset = (asset) => {
        setIsCreateTopic(false)
        setIsEditAsset(true)
        setAssetId(asset.id)
        setAssetName(asset.title)
        setAssetInfo(asset.info)
        setAssetFileType(asset.file_type)
        setAssetFile(asset.file)
        setShowModal(true)
    }

    const triggerCreateQuize = (topicId) => {
        setShowDrawer(true)
        setEditingTopic(topicId)
    }

    const triggerEditQuize = quize => {
        setShowDrawer(true)
        setEditingQuize(quize)
    }

    const createQuize = async (values) => {
        console.log(values)
        setLoading(true)
        const start_date = values.date ? values.date[0] : null;
        const expired_date = values.date ? values.date[1] : null;

        const data = {
            token, topic: editingTopic, name: values.name, exam_type: 'lt', get_result_type: values.resultType,
            duration: values.duration, max_try: values.max_try, pass_score: values.pass_score,
            start_date, expired_date, id: editingQuize.id
        }

        const editData = {
            token, name: values.name, get_result_type: values.resultType,
            duration: values.duration, max_try: values.max_try, pass_score: values.pass_score,
            start_date, expired_date, id: editingQuize.id
        }
        try {
            if (editingQuize.id === undefined) {
                const result = await createExam(data)
            }
            else {
                const result = await editExam(editData)
            }
            message.success(
                !editingQuize.id ? "Tạo bài kiểm tra thành công" : "Chỉnh sửa bài kiểm tra thành công",
                1.5,
                () => window.location.reload()
            )
        } catch (err) {
            message.error(err.message)
        }
        setLoading(false)

    }

    return (
        <section className="section-5 page-2">

            <Row>
                <Col span={10}><h3 className="text--main mb-5">Chủ đề học</h3></Col>
                <Col span={4}>{
                    userRole.code
                        ? userRole.code === "TC" || userRole.code === "TA" ?
                            <Button onClick={() => {
                                setShowModal(true)
                                setIsCreateTopic(true)
                            }
                            } type="primary">Thêm chủ đề học</Button> : null
                        : null
                }</Col>
            </Row>


            {
                isLoading ? (
                    <div>
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                        <Skeleton active avatar />
                    </div>
                ) : learningTopics.map(topic =>
                    <Skeleton key={topic.id} active avatar paragraph={{ rows: 4 }} loading={isDeleting}>
                        <CourseHomeTopic
                            handleDelete={handleDelete}
                            triggerEdit={triggerEdit}
                            userRole={userRole}
                            key={topic.id}
                            topic={topic}
                            token={token}
                            triggerCreateAsset={triggerCreateAsset}
                            triggerEditAsset={triggerEditAsset}
                            triggerCreateQuize={triggerCreateQuize}
                            triggerEditQuize={triggerEditQuize}
                        />
                    </Skeleton>
                )
            }


            <Modal
                destroyOnClose={true}
                width={920}
                style={{ paddingBottom: "0px" }}
                className="bg-white"
                title="Tạo mới chủ đề học"
                visible={showModal}
                confirmLoading={loading}
                footer={[
                    <Button key="back" danger onClick={handleClose}>
                        Huỷ
                    </Button>
                ]}
                onCancel={handleClose}

            >
                {
                    isCreateTopic ?
                        <Form
                            name="topic_form"
                            {...formItemLayout}
                            onFinish={onFinish}
                            initialValues={{
                                name: name
                            }}
                        >
                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                name="name"
                                label="Tên chủ đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên chủ đề',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên chủ đề" value={name} />
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                name="info"
                                label="Mô tả chủ đề"
                            >

                                <CKEditor
                                    key="editor"
                                    editor={ClassicEditor}
                                    data={info}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setInfo(data)
                                    }}
                                >

                                </CKEditor>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Xác nhận
                                </Button>
                            </Form.Item>
                        </Form> :
                        <Form
                            name="asset_form"
                            {...formItemLayout}
                            onFinish={submitCreateAsset}
                            initialValues={{
                                assetName: assetName,
                                description: assetInfo,
                                fileType: assetFileType
                            }}
                        >
                            <Form.Item
                                {...formItemLayout}
                                hasFeedback
                                name="assetName"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên bài giảng',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên bài giảng" value={name} />
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                name="fileType" label="Loại bài giảng">
                                <Radio.Group>
                                    <Radio value="doc">Tài liệu</Radio>
                                    <Radio value="video">Video</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                name="file"
                                label="File bài giảng"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                    {
                                        required: !isEditAsset,
                                        message: 'Vui lòng tải lên file bài giảng',
                                    },
                                ]}
                            >
                                <Upload {...props} name="file" multiple={false}>
                                    <Button disabled={fileList.length > 0}>
                                        <UploadOutlined /> Nhấn để chọn file
                                    </Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                name="description"
                                label="Mô tả"
                            >
                                <Input placeholder="Nhập mô tả bải giảng" value={name} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Xác nhận
                                </Button>
                            </Form.Item>

                        </Form>
                }
            </Modal>

            <Drawer
                destroyOnClose={true}
                title="Tạo bài kiểm tra"
                width={850}
                onClose={() => setShowDrawer(false)}
                visible={showDrawer}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div style={{ textAlign: 'right', }}>
                        <Button type="primary" danger onClick={() => setShowDrawer(false)} style={{ marginRight: 8 }}>
                            Hủy
                        </Button>
                    </div>
                }
            >
                <Form
                    layout="vertical"
                    onFinish={createQuize}
                    initialValues={
                        {
                            name: editingQuize.title,
                            resultType: editingQuize.resultType,
                            duration: editingQuize.duration,
                            max_try: editingQuize.maxTry,
                            pass_score: editingQuize.passScore,
                            date: [moment(editingQuize.startDate), moment(editingQuize.expired)]
                        }
                    }
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name" label="Tên"
                                rules={[{ required: true, message: 'Vui lòng nhập tên bài kiểm tra' }]}
                            >
                                <Input placeholder="Nhập tên bài kiểm tra" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="resultType"
                                label="Cách tính điểm"
                                rules={[{ required: true, message: 'Vui lòng chọn hình thức tính điểm' }]}
                            >
                                <Select placeholder="Hình thức tính điểm">
                                    <Option value="best">Lấy điểm cao nhất</Option>
                                    <Option value="last">Lấy điểm bài làm cuối cùng</Option>
                                    <Option value="average">Lấy điểm trung bình</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item hasFeedback name="duration" label="Thời gian làm bài (giây)"
                                rules={[{ required: true, message: 'Xác định thời gian làm bài' }]}>
                                <InputNumber style={{ width: "100%" }} min={1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item hasFeedback name="max_try" label="Số lần làm bài cho phép (để trống nêu không giới hạn)"
                            >
                                <InputNumber style={{ width: "100%" }} min={1} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="date" label="Thời gian bài kiểm tra">
                                <RangePicker
                                    disabledDate={disabledDate}
                                    // disabledTime={disabledRangeTime}
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                    }}
                                    format="DD-MM-YYYY HH:mm:ss"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item hasFeedback name="pass_score" label="Điểm để qua bài test"
                            >
                                <InputNumber style={{ width: "100%" }} min={0} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Xác nhận
                        </Button>
                    </Form.Item>

                </Form>
            </Drawer>

        </section>


    )
};

export default CourseHomeSchedule;