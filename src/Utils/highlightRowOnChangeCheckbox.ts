import getClosestElement from "./getClosestElement";

export default (checkbox:any)=>{
    let row = getClosestElement(checkbox, "role","row");
    checkbox.checked ?  row.classList.add('rowColorHighlight') : row.classList.remove('rowColorHighlight')
}