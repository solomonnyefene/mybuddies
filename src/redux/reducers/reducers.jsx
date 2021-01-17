
import typeToReducer from 'type-to-reducer';
import valuesIn from 'lodash/valuesIn'
import * as actionTypes from './../actions/ActionType'


const INITIAL_STATE = {
    token:null,
    id:null,
    password:null,
    friends:[],
    isAddedBuddy:false,
    search:{
        searchText:null,
        searchResults:null
    }
}

const Reducer = typeToReducer({

    [actionTypes.LOGOUT]: (state, action) => {
        return {...state, token:null};
    },
    [actionTypes.LOGIN]: (state, action) => {
        return {...state,
            token:action.payload.id,
            id:action.payload.id,
            password:action.payload.password,
        };
    },
    [actionTypes.PERSIST_STATE]: (state, action) => {
        return {...state,
            token:'keepstate@gmail.com',
            id:state.id,
            password:state.password,
            isAddedBuddy:false
        };
    },

    [actionTypes.SEARCH_BUDDY]: (state, action) => {
        let searchText = action.payload,
            buddies = valuesIn(state.friends).filter(buddy => {
                return buddy.body.buddy
            })

        let searchResults = buddies.filter(buddy => {
                return (
                    buddy.body.buddy.first_name.toLowerCase().includes(searchText) ||
                    buddy.body.buddy.surname.toLowerCase().includes(searchText)  ||
                    buddy.body.buddy.marrital_status.toLowerCase().includes(searchText)
                )
            });
        return {
            ...state,
            search: {
                searchText: searchText,
                searchResults: { ...searchResults }
            }
        };
    },

    [actionTypes.GET_DATA]: {
        PENDING: state => ({
            ...state,
            isFetchingFriends:true
        }),
        FULFILLED: (state, action) => {
            return {
                ...state,
                friends: action.payload,
                isFetchingFriends:false
            };
        },
        REJECTED: (state, action) => ({
            ...state,
            errors: {...action.payload.errors},
            isFetchingFriends:false

        })
    },
    [actionTypes.SUBMIT_BUDDY]: {
        PENDING: state => ({...state, isSubmittingBuddy:true, isAddedBuddy:false}),
        FULFILLED: (state, action) => {
            let friends = state.friends,
                updated_friends = [...friends, action.payload];
            return {
                ...state,
                friends:  updated_friends,
                isSubmittingBuddy:false,
                isAddedBuddy:true
            };
        },
        REJECTED: (state, action) => ({
            ...state,
            errors: {...action.payload.errors},
            isSubmittingBuddy:false,
            isAddedBuddy:false

        })
    },



},INITIAL_STATE);

export default Reducer

