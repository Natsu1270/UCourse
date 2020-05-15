import React, {useEffect} from 'react'
import {List, Skeleton} from "antd";
import {useHistory, useRouteMatch} from 'react-router-dom'

const Forums = ({forums, isLoading}) => {

    const history = useHistory()
    const match = useRouteMatch();

    const renderItem = (item) => (
        <div className="dis-flex-between forum-item">
            <span className="b-500 forum-item--title">{item.name}</span>
            <span>{item.thread_count} chủ đề &rarr;</span>
        </div>
    )

    return (
        <section className="section-5 page-2 forum">
            <h4 className="text--main forum--title mb-3">
                Diễn đàn thảo luận
            </h4>
            <h3 className="forum--subtitle mb-5">
                Thảo luận, hỗ trợ về các chủ đề trong quá trình học
            </h3>

            <div className="forum--content">
                {
                    isLoading ? <Skeleton active paragraph={{rows: 4}}/> :
                        <List
                            header={<div className="forum--list-header">Danh sách diễn đàn</div> }
                            className="forum--content__list"
                            size="large"
                            bordered
                            dataSource={forums}
                            renderItem={
                                item =>
                                    <List.Item
                                        onClick={() => history.push(`${match.url}/${item.id}`)}>
                                        {renderItem(item)}
                                    </List.Item>
                            }
                        />
                }
            </div>
        </section>
    )
};

export default Forums