import Form from "./components/Form"
import { useReducer } from "react"
import { ActivityActions, activityReducer,InitialState } from "./reducers/activityReducer"

function App() {

  const [state, dispatch] = useReducer(activityReducer,InitialState)



  return (
<>
<header className="bg-lime-400 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase">Contador de calorias</h1>


      </div>
    </header>

    <section className="bg-lime-500 py-20 px-5">
      <div className="max-w-4xl mx-auto">

        <Form
              dispatch = {dispatch}
        />


      </div>


    </section>
</>



  )
}

export default App
