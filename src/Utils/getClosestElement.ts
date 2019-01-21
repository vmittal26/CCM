export default (element:any,className:string)=>{
    while ((element = element.parentElement) && !element.classList.contains(className));
        return element;
}