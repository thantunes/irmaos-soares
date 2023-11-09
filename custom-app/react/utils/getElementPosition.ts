/* eslint-disable no-cond-assign */
export default function getElementPosition(selector: string): number|void {
    let element = document.querySelector(selector) as HTMLElement;
    let curtop = 0;
    if (element.offsetParent) {
        do {
            curtop += element.offsetTop;
        } while ((element = element.offsetParent as HTMLElement));
        return curtop;
    }
}
