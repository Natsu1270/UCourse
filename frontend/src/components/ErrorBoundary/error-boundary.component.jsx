import React from 'react'
import { useHistory } from 'react-router-dom'

import { Result, Button } from 'antd'


export const ErrorBoundary = ({ errResponse, comp }) => {

    const history = useHistory()

    if (errResponse) {
        if (errResponse.status === 500) {
            return (<Result
                style={{
                    backgroundColor: 'white',
                    boxShadow: '0 1rem 2rem rgba(0,0,0,0.05)'
                }}
                status="500"
                title="500"
                subTitle="Sorry, the server is wrong."
                extra={<Button onClick={() => history.push('/')} type="primary">Trang chủ</Button>}
            />)
        } else {
            return (
                <Result
                    status="warning"
                    title={errResponse.data}
                    extra={
                        <Button type="primary">
                            Trang chủ
                            </Button>
                    }
                />
            )
        }

    } else {
        return comp
    }
}

export default ErrorBoundary