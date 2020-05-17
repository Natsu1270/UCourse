import UIActionTypes from './ui.types'

export const showRLModal = () => {
    return {
        type: UIActionTypes.SHOW_RL_MODAL
    }
};

export const hideRLModal = () => {
    return {
        type: UIActionTypes.HIDE_RL_MODAL
    }
};

export const switchRLForm = () => {
    return {
        type: UIActionTypes.SWITCH_RL_FORM
    }
};

export const toggleAbilityTestModal = () => ({
    type: UIActionTypes.TOGGLE_ABILITY_TEST_MODAL
});

export const toggleRegisterCourseModal = () => ({
    type: UIActionTypes.TOGGLE_REGISTER_COURSE_MODAL
});

export const toggleCreateThreadModal = () => ({
    type: UIActionTypes.TOGGLE_CREAT_THREAD_MODAL
});

export const toggleReplyThreadModal = () => ({
    type: UIActionTypes.TOGGLE_REPLY_THREAD_MODAL
});