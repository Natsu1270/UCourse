import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { Button, Carousel, Form, message, notification, Radio, Spin, Statistic } from 'antd'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { submitAbilityTestAPI } from '../../api/abilityTest.services'
import Constants from '../../constants'
import { tokenSelector } from "../../redux/Auth/auth.selects"
import { parseHtml } from '../../utils/text.utils'
import AbilityTestResult from "./ability-test-result.component"
import './ability-test.styles.css'

const { Countdown } = Statistic;

const AbilityTestForm = ({ duration, questions, uATId }) => {

    const [timer, setTimer] = useState(duration);
    const [isFinish, setIsFinish] = useState(false);
    const [result, setResult] = useState(0);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const token = useSelector(state => tokenSelector(state));


    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            hljs.highlightBlock(block)
        })
    }, []);


    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    };


    const unDoneNotification = (result, user_responses) => {
        const key = `open${Date.now()}`;
        const btn = (<div>
            <Button className="mr-2" danger size="small" onClick={() => {
                notification.close(key);
                submitTest(result, user_responses, uATId)
            }}>
                Xác nhận
            </Button>
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Huỷ
            </Button>
        </div>);
        notification.open({
            message: 'Xác nhận',
            description: 'Một số câu hỏi chưa được trả lời, bạn vẫn muốn submit?',
            btn,
            key,
            duration: null
        })
    };

    const submitTest = async (result, user_responses, id) => {
        setLoading(true)
        try {
            await submitAbilityTestAPI({ token, result, user_responses, id })
            message.success("Gửi kết quả thành công!", 1.5, () => setIsFinish(true))
        } catch (err) {
            message.error("Có lỗi xảy ra: " + err.message)
        }
        setLoading(false)
    }

    const onFinish = (values) => {
        console.log('responses: ', values);
        setResponse(values);
        const user_responses = Object.values(values).filter(c => c);
        const valuesList = Object.values(values);
        const isUnCompleted = valuesList.some(choice => choice === undefined);
        const result = calResult(values);
        setResult(result);
        if (isUnCompleted && timer !== 0) {
            unDoneNotification(result, user_responses)
        } else {
            // dispatch(submitAbilityTestStart({ token, result, user_responses, id: uATId }));
            // setIsFinish(true)
            submitTest(result, user_responses, uATId)
        }
    };

    const submitForm = () => {
        form.submit()
    };

    const calResult = response => {
        const choices = Object.values(response);
        let answers = [];
        let score = 0;

        questions.forEach(question => {
            answers.push(question.answers[0])
        });
        choices.forEach((c, index) => {
            if (c === answers[index]) {
                score += 1
            }
        });
        return score
    };


    const radioStyle = {
        display: 'flex',
        whiteSpace: 'normal',
        marginTop: '2rem',
    };


    if (isFinish) {
        return <AbilityTestResult result={result} questions={questions} responses={response} />
    } else {
        return (
            <Spin indicator={Constants.LOADING_ICON} spinning={loading}>
                <div className="ability-test-form">
                    <div className="ability-test-form__timer">
                        <h3 className="ability-test-form__timer--info">
                            {
                                isFinish ? <p className="text--sub__bigger">Hoàn thành</p> :
                                    <Countdown
                                        title="Thời gian còn lại"
                                        value={Date.now() + duration * 1000}
                                        onFinish={() => {
                                            setTimer(0)
                                            submitForm()
                                        }} />}
                        </h3>



                        <Button onClick={submitForm} type="danger">
                            Hoàn tất
                        </Button>



                    </div>
                    <div className="ability-test-form__content mt-4">
                        <div className="ability-test-form__content--question">
                            <Form
                                name="questionsForm"
                                onFinish={onFinish}
                                form={form}
                                {...formItemLayout}>

                                {
                                    questions.map((question, index) => (
                                        <div className="choices" key={question.id}>
                                            <div
                                                className="ability-test-form__content--question__header dis-flex-start">
                                                <span>{`Câu ${index + 1}: `}</span>{parseHtml(question.content)}
                                            </div>

                                            <Form.Item
                                                name={question.id}
                                                label="">
                                                <Radio.Group>
                                                    {
                                                        question.choices.map(choice => (
                                                            <Radio key={choice.id} style={radioStyle}
                                                                className='radio-choice' value={choice.id}>
                                                                {parseHtml(choice.content)}
                                                            </Radio>
                                                        ))
                                                    }
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    ))
                                }


                            </Form>
                        </div>
                    </div>
                </div>
            </Spin>
        )
    }
};

export default AbilityTestForm