import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faPowerOff, faBars
} from "@fortawesome/free-solid-svg-icons";

const fontawesome = () => {
  library.add(faPowerOff,faBars);
  dom.watch();
};

export default fontawesome;
