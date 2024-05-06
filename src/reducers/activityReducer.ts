import { Activity } from "../types"

//acciiones que va a ejecutar el dispatch
//payload es la informacion que se le pasa a la accion
export type ActivityActions = 
    {type:'save-activity',payload:{newActivity:Activity}} |
    //elemento que se selecciono para editarlo
    {type:'set-activeId',payload:{id:Activity['id']}}



export type ActivityState={
    activities :Activity[],
    activeId:Activity['id']
}

//inicializamos el estado, sera un estado de actividades, tipo de ejercicio, calorias etc
export const InitialState:ActivityState = {
activities:[],
activeId:''


}
//esto sera mandado llamar por el dispatch
export const activityReducer = (

    state:ActivityState = InitialState,
    action:ActivityActions
)=>{

    //determinar que accion se va a ejecutar
    if(action.type === 'save-activity'){

        let updateActivities : Activity[]= []
        //este codigo maneja la logica para actualizar el state
        if(state.activeId){
            //quiere decir que estamos editando algo
            updateActivities = state.activities.map(activity =>
                 activity.id === state.activeId 
                 ? action.payload.newActivity : activity)
        }else {

            updateActivities=[...state.activities,action.payload.newActivity]
        }

        //con el action.payload recuperamos los datos de form
        return{
            ...state,activities:updateActivities,
            activeId:''
            //...state,activities:[...state.activities,action.payload.newActivity]
              
        }
    }

    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId:action.payload.id
        }
    }

    return state
}