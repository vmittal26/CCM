import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faPowerOff, faBars, faCalendar, faCalendarAlt, faTimes
} from "@fortawesome/free-solid-svg-icons";

const fontawesome = function (){
  library.add(faPowerOff,faBars,faCalendarAlt,faTimes);
  dom.watch();
};

export default fontawesome;
