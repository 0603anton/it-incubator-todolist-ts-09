import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export type AddTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskACType
    | AddTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD_TASK':

            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)
            }
        // тут была ошибка не дестректурировал таску, а просто вернул вместо неё св-во isDone
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]:[]
            }
        case "REMOVE-TODOLIST":
            // мой код написан не верно
        // delete state[action.id]
        // return state
            //два ваиранта правильного решения
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
                // решение с деструктуризацией
        // const {[action.id]:[],...rest}={...state}
        // return rest
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            taskId,
            todolistId,
            isDone
        }
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            taskId,
            todolistId,
            title
        }
    } as const
}
