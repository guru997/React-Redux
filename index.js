const redux = require('redux')
const CreateStore = redux.createStore 

const BUY_CAKE = 'BUY_CAKE'

function buycake()
{
    return {
        type: BUY_CAKE,
        info: 'first redux action'
    }
}

const intialState =
{
    numberOfCake : 10
}

  
const reducer = (State = intialState,action) =>{

    switch (action.type) {
        case BUY_CAKE:
             return{
            ...State,
            numberOfCake : State.numberOfCake - 1
        }
            
    
        default : return State
            
    }

}

const store = CreateStore(reducer)
console.log('intial state',store.getState())
const unsubscribe = store.subscribe(()=> console.log('Update state',store.getState()))
store.dispatch(buycake())
store.dispatch(buycake())
unsubscribe()


