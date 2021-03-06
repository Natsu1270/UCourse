import React, { useState, useEffect } from 'react'

import { Layout, message, Skeleton, Space, Row, Divider, Col, Tag, List } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { getPublicUserProfileAPI } from '../../api/profile.services';
import Avatar from 'antd/lib/avatar/avatar';
import {
    UserOutlined, MailOutlined, CalendarOutlined, EnvironmentOutlined,
    PhoneOutlined, ManOutlined, HeartOutlined, HomeOutlined, SmileOutlined, DollarCircleOutlined, RocketOutlined
} from '@ant-design/icons';
import { timeDiff } from '../../utils/text.utils';
import Constants from '../../constants';
import ResultComponent from '../../components/Common/result.component'
import { tokenSelector } from '../../redux/Auth/auth.selects'
import { useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'


const { Sider, Content } = Layout;


const PublicProfilePage = ({ userRole }) => {

    const { username } = useParams()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState({})
    const [profileDetail, setProfileDetail] = useState({})
    const [classes, setClasses] = useState([])
    const [canView, setCanView] = useState(true)

    const { token } = useSelector(createStructuredSelector({
        token: tokenSelector
    }));

    const getProfile = async () => {
        setLoading(true)
        try {
            const { data } = await getPublicUserProfileAPI(username, token)
            if (data.status !== 401) {
                setUserProfile(data.data)
                setProfileDetail(data.data.user_profile)
                setClasses(data.data.classes)
            } else {
                setCanView(false)
            }
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getProfile()
    }, [])

    return (
        <section className="section-10 page">
            {
                canView ?
                    <Layout>
                        <Sider theme="light" className="user-profile--sider" width={360}>
                            <Skeleton loading={loading} active avatar paragraph={{ rows: 4 }}>
                                <Row justify="center">
                                    <Avatar
                                        size={240}
                                        src={profileDetail.avatar}
                                        icon={
                                            profileDetail.avatar ? profileDetail.avatar : <UserOutlined />
                                        }
                                    />
                                </Row>
                                <p className="text--main text-center">
                                    @{userProfile.username}
                                </p>
                                <Row>
                                    <Space className="text--sub__bigger2">
                                        <MailOutlined /> {userProfile.email}
                                    </Space>
                                </Row>
                                <Row>
                                    <Space className="text--sub__bigger2">
                                        <CalendarOutlined /> Tham gia {timeDiff(userProfile.date_joined)}
                                    </Space>
                                </Row>

                            </Skeleton>
                        </Sider>
                        <Content className="user-profile--content">
                            <Skeleton active paragraph={{ rows: 4 }} loading={loading}>
                                <h3 className="text--main">
                                    {profileDetail.fullname}
                                </h3>
                                <p className="text--sub__bigger3">
                                    <Tag color="cyan">{userProfile.role ? userProfile.role.name : null}</Tag>
                                </p>
                                <Divider />
                                <div className="user-profile--detail text--sub__bigger2 text-grey">
                                    <Row>
                                        <Col span={12}>
                                            <EnvironmentOutlined /> Địa chỉ: {profileDetail.address ? profileDetail.address : 'N/A'}
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <PhoneOutlined /> Phone: {profileDetail.phone_number ? profileDetail.phone_number : 'N/A'}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col><ManOutlined /> Giới tính: {profileDetail.gender === "M" ? "Nam" : "Nữ"}</Col>
                                    </Row>
                                    <Row>
                                        <Col><SmileOutlined /> Tuổi: {profileDetail.age}</Col>
                                    </Row>
                                    <Row>
                                        <Col><HeartOutlined /> Giới thiệu: {profileDetail.bio}</Col>
                                    </Row>
                                    <Row>
                                        <Col><HomeOutlined /> Trường: {profileDetail.university}</Col>
                                    </Row>
                                    <Row>
                                        <Col><RocketOutlined /> Ngành: {profileDetail.major}</Col>
                                    </Row>
                                    <Row>
                                        <Col><DollarCircleOutlined /> Công việc: {profileDetail.occupation}</Col>
                                    </Row>
                                </div>
                                {
                                    userProfile.role ? userProfile.role.code == 'TC' ? (
                                        <Row className="mt-5">
                                            <Col span={24}>
                                                <h3 className="text--main">Danh sách lớp giảng dạy</h3>
                                            </Col>
                                            <Col span={24}>
                                                <List
                                                    bordered
                                                    itemLayout="horizontal"
                                                    dataSource={classes}
                                                    loading={loading}
                                                    renderItem={item => {
                                                        return (
                                                            <List.Item
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => history.push(`/courses/${item.course.slug}`)}>
                                                                <List.Item.Meta
                                                                    title={<Space>{item.full_name}</Space>}
                                                                    avatar={<Avatar src={item.course.icon} />}
                                                                />
                                                            </List.Item>
                                                        )
                                                    }}

                                                >

                                                </List>
                                            </Col>
                                        </Row>
                                    ) : null : null
                                }
                            </Skeleton>
                        </Content>
                    </Layout> : <div className="page-card">
                        <ResultComponent
                            type={Constants.RESULT_TYPE_NODATA}
                            title="Private User Profile"
                            info="Người dùng này không bật chế độ công khai thông tin cá nhân"
                        />
                    </div>

            }

        </section>
    )


}

export default PublicProfilePage