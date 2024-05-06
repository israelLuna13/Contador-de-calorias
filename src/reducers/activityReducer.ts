import { Activity } from "../types"

//acciiones que va a ejecutar el dispatch
//payload es la informacion que se le pasa a la accion
export type ActivityActions = 
    {type:'save-activity',payload:{newActivity:Activity}} |
    //elemento que se selecciono para editarlo
    {type:'set-activeId',payload:{id:Activity['id']}} |
    
    {type:'delete-activity',payload:{id:Activity['id']}} |

    {type:'restart-app'} 

export type ActivityState={
    activities :Activity[],
    activeId:Activity['id']
}

//obtener lo que este en el local storage 
const localStorageActivities = ():Activity[] =>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities):[]
}

//inicializamos el estado, sera un estado de actividades, tipo de ejercicio, calorias etc
//cuando se recargue la pagina el activiti tomara lo que tenga el local storage
export const InitialState:ActivityState = {
activities:localStorageActivities(),
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

    //eliminar
    if(action.type === 'delete-activity'){
        return{
            ...state,
            activities:state.activities.filter(activity => activity.id != action.payload.id)
        }
    }

    if(action.type === 'restart-app'){
        return{
            activities:[],
            activeId:''
        }
    }
    return state
}