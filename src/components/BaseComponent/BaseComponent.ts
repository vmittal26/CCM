import eventEmitter from "../../EventEmitter";

export default class BaseComponent {
  protected EE: any;

  constructor() {
    this.EE = eventEmitter;
  }

  public getGlobalEventBus = () => {
    return this.EE;
  };
}
