import { IDatePickerProps } from './IDatePickerProps';
import { ISelectProps } from "./ISelectProps";

export default interface IElementConfig{
    caption?:string
    placeholder?:string
    type:string
    id?:string
    props?:any
    selectProps?:ISelectProps
    datePickerProps?:IDatePickerProps
    classes?:Array<string>
    name:string
}