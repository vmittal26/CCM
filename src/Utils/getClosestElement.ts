export default (element:any,attributeName:string,attributeValue:string)=>{
    while ((element = element.parentElement) && element.getAttribute(attributeName)!==attributeValue);
    return element;
}