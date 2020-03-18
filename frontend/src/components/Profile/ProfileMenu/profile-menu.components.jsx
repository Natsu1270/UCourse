import React from 'react'
import { Card, Avatar, Menu } from "antd";
import {createStructuredSelector} from "reselect";
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../../redux/Auth/auth.selects";

const { Meta } = Card

const ProfileMenu = () => {
    const {currentUser} = useSelector(createStructuredSelector({
        currentUser: currentUserSelector
    }))

    return (
        <div className="profile-menu">
            <Card  >
                <Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    }
                    title={currentUser ? currentUser.username : '...'}
                    description={currentUser ? currentUser.email: '...'}
                />
            </Card>

            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <Menu.Item key="1">
                    <span>Profile</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span>Account</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <span>Option 3</span>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default ProfileMenu