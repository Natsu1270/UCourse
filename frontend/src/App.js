import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import LoginAndRegisterPage from "./pages/LoginAndRegisterPage/login-register.page";
import Header from "./components/Header/header.component";
import Footer from "./components/Footer/footer.component";
import HomePage from "./pages/HomePage/home.page";
import ProfilePage from "./pages/ProfilePage/profile.page";
import { tokenSelector, currentUserSelector, userRoleSelector } from './redux/Auth/auth.selects'


import 'antd/dist/antd.css'
import './App.scss';
import { Spin, Layout, BackTop } from 'antd';
import PrivateRoute from "./components/Common/private-route.component";
import AuthRoute from "./components/Common/auth-route.component";
import { getProfileStart } from "./redux/Profile/profile.actions";
import { getMyNotificationsStart } from './redux/Notification/notification.actions'
import { fetchMyCoursesStart } from "./redux/CourseHome/course-home.actions";
import { myCourseHomesSelector } from "./redux/CourseHome/course-home.selects";
import { myCoursesSelector, myProgramsSelector } from "./redux/Home/home.selects"
// import PrivateCourseRoute from "./components/Common/private-course-route.component";
import PrivateHomePage from "./pages/HomePage/private-home.page";
import { getAllStart, getAllMyStart } from "./redux/Home/home.actions";
import RoleComponent from './components/RoleComponent';
import TeacherHomePage from './pages/HomePage/teacher-home.page';
import { myNotificationsSelector, fetchingNotificationSelector, favCourseCountSelector } from './redux/Notification/notification.selects';


const AdminHomePage = lazy(() => import('./pages/HomePage/admin-home.page'));
const Page404NotFound = lazy(() => import("./pages/404.page"));
const AboutPage = lazy(() => import('./pages/AboutPage/about.page'));
const EventPage = lazy(() => import('./pages/EventPage/event.page'));
const GuidePage = lazy(() => import('./pages/GuidePage/guide.page'));
const GuideLinePage = lazy(() => import('./pages/GuidePage/guide-line.page'));
const ContactPage = lazy(() => import('./pages/ContactPage/contact.page'));
const QuestionPage = lazy(() => import('./pages/QuestionPage/question.page'));
const SearchPage = lazy(() => import('./pages/SearchPage/search.page'));
const FieldPage = lazy(() => import('./pages/FieldPage/field.page'));
const FieldDetailPage = lazy(() => import('./pages/FieldPage/field-detail.page'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail/program-detail.page'));
const CourseDetail = lazy(() => import('./pages/CourseDetail/course-detail.page'));
const AbilityTestPage = lazy(() => import('./pages/AbilityTestPage/ability-tests.page'));
const CourseHomePage = lazy(() => import('./pages/CourseHome/course-home.page'));
const ClassDetailPage = lazy(() => import('./pages/ClassDetail/class-detail.page'));
const CoursePaymentPage = lazy(() => import('./pages/CoursePayment/course-payment.page'));
const UserProfilePage = lazy(() => import('./pages/ProfilePage/public-profile.page'))
const MyCoursePage = lazy(() => import('./pages/MyCoursePage/my-courses.page'))
const MyCertificatePage = lazy(() => import('./pages/MyCertificatePage/my-certificates.page'))
const ProgramProcess = lazy(() => import('./pages/ProgramProcess/program-process.component'))
const RegisterClassPage = lazy(() => import('./pages/RegisterClass/register-class.page'))
const NotificationPage = lazy(() => import('./pages/Notification/notification.page'))
const AdminCertificate = lazy(() => import('./pages/AdminPage/admin-certificate.page'))
const AdminCertificateCourse = lazy(() => import('./pages/AdminPage/admin-certificate-course.component'))
const AdminCertificateProgram = lazy(() => import('./pages/AdminPage/admin-certificate-program.component'))
const FavoriteCoursePage = lazy(() => import('./pages/FavoriteCoursePage/my-favorite-courses.page'))
const CertificateInquryPage = lazy(() => import('./pages/CertificateInquiry/certificate-inquiry.page'))



function App() {

    const dispatch = useDispatch();
    const {
        token, currentUser, userRole, myCourses, myPrograms, notifications, fetchingNotify, favCourseCount
    } = useSelector(createStructuredSelector({
        token: tokenSelector,
        currentUser: currentUserSelector,
        userRole: userRoleSelector,
        myCourses: myCoursesSelector,
        myPrograms: myProgramsSelector,
        notifications: myNotificationsSelector,
        fetchingNotify: fetchingNotificationSelector,
        favCourseCount: favCourseCountSelector
    }));

    useEffect(() => {
        if (currentUser && token) {
            dispatch(getProfileStart(token));
            dispatch(getAllMyStart(token));
            dispatch(getAllStart());
            dispatch(getMyNotificationsStart(token))
        }
    }, [dispatch, currentUser, token]);

    const { Content } = Layout;
    return (
        <Router>
            <div className="App">
                <Layout>
                    <Header
                        token={token} currentUser={currentUser} notifications={notifications}
                        isFetching={fetchingNotify} favCourseCount={favCourseCount} />

                    <Switch>
                        <Route exact path="/">
                            {
                                currentUser ?
                                    <RoleComponent
                                        StudentComponent={PrivateHomePage}
                                        TeacherTAComponent={TeacherHomePage}
                                        AdminComponent={AdminHomePage}
                                        roleCode={userRole.code}
                                        token={token}
                                        ownCourses={myCourses} ownPrograms={myPrograms}
                                    /> :

                                    <HomePage currentUser={currentUser} />
                            }
                        </Route>
                        <Content className="content">
                            <Suspense fallback={<Spin />}>
                                <Switch>
                                    <Route exact path="/about" component={AboutPage} />
                                    <Route exact path="/huongdan-thanhtoan" component={GuidePage} />
                                    <Route exact path="/guideline" component={GuideLinePage} />
                                    <Route exact path="/lienhe" component={ContactPage} />
                                    <Route exact path="/cauhoi" component={QuestionPage} />
                                    <Route exact path="/event" component={EventPage} />
                                    <AuthRoute exact path="/auth" component={LoginAndRegisterPage} />
                                    <PrivateRoute path="/profile" component={ProfilePage} />
                                    <Route exact path="/search"> <SearchPage token={token} /></Route>
                                    <Route exact path="/field" component={FieldPage} />
                                    <Route path="/field/:slug" component={FieldDetailPage} />
                                    <Route path="/programs/:slug" component={ProgramDetail} />
                                    <Route exact path="/courses/:slug/class/:name" component={ClassDetailPage} />
                                    <Route path="/courses/:slug" component={CourseDetail} />
                                    {/* <Route exact path="/courses/:slug/redirect" component={CoursePaymentPage} /> */}
                                    <Route exact path="/ability-tests" component={AbilityTestPage} />
                                    <Route path="/learn/:slug">
                                        <CourseHomePage myCourses={myCourses} userRole={userRole} />
                                    </Route>
                                    <Route path="/notification">
                                        <NotificationPage notifications={notifications} loading={fetchingNotify} />
                                    </Route>
                                    <Route exact path="/user/:username">
                                        <UserProfilePage userRole={userRole} />
                                    </Route>
                                    <Route exact path="/certificate-info">
                                        <CertificateInquryPage />
                                    </Route>
                                    <PrivateRoute
                                        referrer="/my-courses"
                                        exact
                                        path="/my-courses"
                                        component={MyCoursePage}
                                        token={token}
                                    />
                                    <PrivateRoute
                                        referrer="/favorite-courses"
                                        exact
                                        path="/favorite-courses"
                                        component={FavoriteCoursePage}
                                        token={token}
                                    />
                                    <PrivateRoute
                                        referrer="/my-certificates"
                                        exact
                                        path="/my-certificates"
                                        component={MyCertificatePage}
                                        token={token}
                                    />
                                    <PrivateRoute
                                        referrer="/program-process"
                                        exact
                                        path="/program-process"
                                        component={ProgramProcess}
                                        token={token}
                                    />
                                    <Route path="/admin">
                                        <AdminHomePage token={token} />
                                    </Route>
                                    <PrivateRoute
                                        path="/register-class"
                                        component={RegisterClassPage}
                                        token={token}
                                    />

                                    <PrivateRoute
                                        path="/certificate-manage"
                                        component={AdminCertificate}>

                                    </PrivateRoute>
                                    <PrivateRoute
                                        path="/certificate/course/:courseId/class/:courseHomeId"
                                        component={AdminCertificateCourse}>

                                    </PrivateRoute>
                                    <PrivateRoute
                                        path="/certificate/program/:programId/detail/:studentProgramId"
                                        component={AdminCertificateProgram}>

                                    </PrivateRoute>


                                    <Route component={Page404NotFound} />
                                </Switch>
                            </Suspense>
                            <BackTop />
                        </Content>
                    </Switch>

                    <Footer />
                </Layout>
            </div>
        </Router>

    );
}

export default App;
