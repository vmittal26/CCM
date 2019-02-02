import * as EventEmitter from "eventemitter3";
console.log('initializing global event bus...');
const EE = new EventEmitter();
export default EE;