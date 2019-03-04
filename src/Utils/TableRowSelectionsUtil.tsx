import getClosestElement from "./getClosestElement";
export function onToggleSelectAllCheckBox(isChecked:boolean) {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]:not([role="selectAll"])');

  Array.prototype.forEach.call(checkboxes,(checkbox: any) => {
    if (isChecked) {
      let row =  getClosestElement(checkbox, "role","row");
      checkbox.checked = isChecked;
      row.classList.add('rowColorHighlight');
    }
    else {
      let row = getClosestElement(checkbox, "role","row");
      checkbox.checked = isChecked;
      row.classList.remove('rowColorHighlight');
    }
  });
}
export function deselectAllCheckbox(containerClass?:string){

  let checkboxes =containerClass ? document.querySelectorAll(`.${containerClass} input[type="checkbox"]:checked`):document.querySelectorAll('input[type="checkbox"]:checked');

  Array.prototype.forEach.call(checkboxes,(checkbox: any)=>{
    if (checkbox.checked) {
      let row =  getClosestElement(checkbox, "role","row");
      checkbox.checked = false;
      row.classList.remove('rowColorHighlight');
    }
  });
}