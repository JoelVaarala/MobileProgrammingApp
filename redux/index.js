import { combineReducers ,createStore} from 'redux';

// Actions
// delivers data by using dispatch within components for the reducers and ultimately store


export const addUid = (value) => {
    return {
        type: "addUid",
        item: value
    }
}

// Reducers
// includes logic and updates states

const UserDataReducer = (state, action) => {
    if(state === undefined){
        state = [{
            id: ""
        }];
    }
    switch(action.type){
        case "addUid":
            state[0].id = action.item
            return state;
        default:
            return state;
    }
}

// root reducer that has all individual reducers wrapped is easier to use with multiple classes
export const rootReducer = combineReducers({
    UserDataReducer,
})

// store, that has all the data is "wrapped around" main component of the app via <Provider> so all files have access to the store
export const store = createStore(rootReducer)