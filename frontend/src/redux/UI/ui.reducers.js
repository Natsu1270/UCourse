import UIActionTypes from './ui.types'

const initState = {
    isRLModalActive: false,
    isSignupPanelActive: false,
    isAbilityTestModalActive: false,
    registerResultModal: false,
    createThreadModal: false,
    replyThreadModal: false,
};

const uiReducer = (state = initState, action) => {
    switch (action.type) {
        case UIActionTypes.SHOW_RL_MODAL:
            return {
                ...state,
                isRLModalActive: true
            };

        case UIActionTypes.HIDE_RL_MODAL:
            return {
                ...state,
                isRLModalActive: false
            };

        case UIActionTypes.SWITCH_RL_FORM:
            return {
                ...state,
                isSignupPanelActive: !state.isSignupPanelActive
            };

        case UIActionTypes.TOGGLE_ABILITY_TEST_MODAL:
            return {
                ...state,
                isAbilityTestModalActive: !state.isAbilityTestModalActive
            };

        case UIActionTypes.TOGGLE_REGISTER_COURSE_MODAL:
            return {...state, registerResultModal: !state.registerResultModal};

        case UIActionTypes.TOGGLE_CREAT_THREAD_MODAL:
            return {...state, createThreadModal: !state.createThreadModal}

        case UIActionTypes.TOGGLE_REPLY_THREAD_MODAL:
            return {...state, replyThreadModal: !state.replyThreadModal}

        default:
            return state
    }
};

export default uiReducer