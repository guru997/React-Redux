const redux = require('redux')
const CreateStore = redux.createStore
const CombineReducer = redux.combineReducers

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake()
{
    return{
        
    type: BUY_CAKE

    }
}


function buyIcecream()
{
    return {
      type: BUY_ICECREAM
    }
}

const intialCake =
{
    numberofCakes : 10
}

const intialIceCream = 
{
    numberofIcecream : 20
}

const reducerCake = (statecake = intialCake,action) =>
{
    switch (action.type)
    {
        case BUY_CAKE : return {
            ...statecake,
            numberofCakes : statecake.numberofCakes - 1
        }
        default : return statecake
    }

}

const reducerIcecream = (stateIcecream = intialIceCream,action) =>
{
    switch (action.type) {
      case BUY_ICECREAM:
        return {
          ...stateIcecream,
          numberofIcecream: stateIcecream.numberofIcecream - 1
        };
      default : return stateIcecream;
    }
}

const rootreducer = CombineReducer({
  cake: reducerCake,
  icecream: reducerIcecream
});

const store = CreateStore(rootreducer)
console.log('Intial state',store.getState())
const unsubscribe = store.subscribe(()=>console.log('Update State',store.getState()));
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()


