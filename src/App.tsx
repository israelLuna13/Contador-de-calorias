import Form from "./components/Form"
import { useEffect, useMemo, useReducer } from "react"
import {  activityReducer,InitialState } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer,InitialState)

  const canRestartApp = () => useMemo(() => state.activities.length , [state.activities])
  //escribir en el localstorage
  useEffect(()=>{
    localStorage.setItem('activities',JSON.stringify(state.activities))
  },[state.activities])

  return (
<>
<header className="bg-lime-400 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        
        <h1 className="text-center text-lg font-bold text-white uppercase">
          Contador de calorias
        </h1>

        <button
        className="bg-gray-800 hover:bg-gray-900 p-2 font-bold
        uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
        disabled={!canRestartApp()}
        onClick={()=>dispatch({type:'restart-app'})}>
          Reiniciar App
        </button>

      </div>
    </header>

    <section className="bg-lime-500 py-20 px-5">
      <div className="max-w-4xl mx-auto">

        <Form
              dispatch = {dispatch}
              state={state}
              />
      </div>

    </section>

<section
className="bg-gray-800 py-10">
  <div className="max-w-4xl mx-auto">
    <CalorieTracker
    activities = {state.activities}
    />
  </div>


</section>


    <section className="p-10 mx-auto max-w-4xl">
      <ActivityList
      activities = {state.activities}
      dispatch = {dispatch}
      />
    </section>
</>
  )
}

export default App
