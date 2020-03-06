const redux = require('redux')
const thunk = require("redux-thunk").default
const axios = require('axios')

const createstore = redux.createStore
const applyMiddleware = redux.applyMiddleware



const intialState =
{
    loading: false,
    user: [],
    error: ''
}

const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST"
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

const fetchdatarequest = () =>
{
    return{
    type:FETCH_DATA_REQUEST
    }
}

const fetchdatasuccess = users =>
{
    return {
        type: FETCH_DATA_SUCCESS,
        payload: users
    }

}

const fetchdatafailure = error =>
{
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}

const reducer = (state= intialState, action) =>
{
    switch(action.type)
    {
        case FETCH_DATA_REQUEST : 
        return {
            ...state,
            loading : true

        }

        case FETCH_DATA_SUCCESS : 
        return {
            loading: false,
            users:action.payload,
            error:''

        }

        case FETCH_DATA_FAILURE : 
        return {
            loading: false,
            users:[],
            error: action.payload

        }
    }
}

const fetchusers = () =>
{
    return function(dispatch)
    {
        dispatch(fetchdatarequest())
        axios.get('https://jsonplaceholder.typicod.com/users')
        .then(response =>{
            const users = response.data.map(user => user.id)
            dispatch(fetchdatasuccess(users))
        }).catch(error =>{
            dispatch(fetchdatafailure(error.messasge))
        })
    }
}

const store = createstore(reducer,applyMiddleware(thunk))
store.subscribe(()=> console.log(store.getState()))
store.dispatch(fetchusers())

