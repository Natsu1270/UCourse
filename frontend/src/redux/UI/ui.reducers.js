import UIActionTypes from './ui.types'

const initState = {
    isRLModalActive: false,
    isSignupPanelActive: false,
    isAbilityTestModalActive: false,
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

        default:
            return state
    }
};

export default uiReducer