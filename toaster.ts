export class Toaster {
  private body: HTMLElement;
  private slice: HTMLElement;
  private time: number = null;
  private callBack: Function;
  private id: string;

  constructor() {
    this.init();
  }

  /**
   * Inits the toaster process.
   * Checks to see if the toaster DOM element is present.
   * Assigns toaster DOM element.
   */
  private init(): void {
    // Check to see if the toaster container div exists. If id doesn't then we create it.
    if (!document.querySelector("#toaster")) {
      let toasterDiv = document.createElement("div");
      toasterDiv.id = "toaster";
      document.querySelector("body").appendChild(toasterDiv);
    }

    // assign to the toaster DOM Element.
    this.body = document.querySelector("#toaster");
  }

  /**
   * Display a success message 'Green Font Color'
   * @param message Message to be displayed in the toaster.
   * @param callback A callback that should be called when user clicks on the toaster.
   * @param time Number in milliseconds the toaster should be visible for. Pass Null to have the user manually dismiss the toaster message.
   */
  public success(
    message: string,
    params?: { time?: number | null; callback?: Function }
  ): void {
    if (params) {
      this.time = params.time ? params.time : null;
      this.callBack = params.callback ? params.callback : null;
    }
    this.construct("success", message);
  }

  /**
   * Display a info message 'Yellow Font Color'
   * @param message Message to be displayed in the toaster.
   * @param callback A callback that should be called when user clicks on the toaster.
   * @param time Number in milliseconds the toaster should be visible for. Pass Null to have the user manually dismiss the toaster message.
   */
  public info(
    message: string,
    params?: { time?: number | null; callback?: Function }
  ): void {
    if (params) {
      this.time = params.time ? params.time : null;
      this.callBack = params.callback ? params.callback : null;
    }
    this.construct("info", message);
  }

  /**
   * Display a warning message 'Red Font Color'
   * @param message Message to be displayed in the toaster.
   * @param callback A callback that should be called when user clicks on the toaster.
   * @param time Number in milliseconds the toaster should be visible for. Pass Null to have the user manually dismiss the toaster message.
   */
  public warning(
    message: string,
    params?: { time?: number | null; callback?: Function }
  ): void {
    if (params) {
      this.time = params.time ? params.time : null;
      this.callBack = params.callback ? params.callback : null;
    }
    this.construct("warning", message);
  }

  /**
   * Constructs the the toaster message and then triggers the pop.
   * @param type Type of toaster message. Acceptable Types : 'success', 'info', 'warning'
   * @param message Message to be displayed in the toaster.
   */
  private construct(type: string, message: string): void {
    this.slice = document.createElement("div");
    this.slice.setAttribute("draggable", "true");
    this.slice.className = "toaster shadow-sm " + type;
    this.slice.innerHTML = `
      <div class="message">${message}</div>
      <i class="material-icons">close</i>
    `;
    // Assign it a id to get the height in order to set the negative margin.
    // for smooth transition
    this.id = "toast" + Math.round(Math.random() * 10000);
    this.slice.id = this.id;

    // Insert the toaster into the browser
    this.popToast();
  }

  /**
   * Inserts the toaster message into the DOM and set the removal time and callback.
   */
  private popToast(): void {
    this.body.appendChild(this.slice);

    // Dynamically set the start negative margin for smooth insert.
    let startMargin = document.getElementById(this.id);
    startMargin.setAttribute(
      "style",
      "margin-bottom:  -" + startMargin.offsetHeight.toString() + "px"
    );

    // Set a abbreviation time out to add the 'in' class.
    setTimeout(() => {
      this.slice.classList.add("in");
    }, 10);

    // Add a event listen for 'swiping' the toaster.
    this.slice.addEventListener(
      "touchmove",
      e => {
        this.close();
      },
      { passive: true }
    );

    // Add a event listen for clicks on the toaster.
    this.slice.addEventListener("click", () => {
      // if there is a callback execute the the callback and close the toaster
      if (this.callBack) {
        this.callBack();
      }
      this.close();
    });

    // If there is another time set for display we use it.
    if (this.time > 0) {
      setTimeout(() => {
        this.close();
      }, this.time);
    } else if (this.time === 0) {
      // We set back and drink coffee!
    } else {
      // AutoClose Default set to two and a half seconds.
      setTimeout(() => {
        this.close();
      }, 2500);
    }

    // If there are more than 4 messages on screen we want to remove the oldest message.
    if (this.body.childElementCount > 4) {
      this.body.removeChild(this.body.childNodes[0]);
    }
  }

  /**
   * Closes the toaster.
   */
  public close(): void {
    this.slice.classList.add("out");
    setTimeout(() => {
      this.slice.remove();
    }, 400);
  }

  /**
   * Clear all toaster currently in the DOM
   */
  public clearAllToasters(): void {
    this.body.innerHTML = "";
  }
}
