export default function elementHeight(selector: string): number {
    const els = document.querySelectorAll<HTMLElement>(selector);
    let height = 0;
    els.forEach((el) => {
        height += el.offsetHeight;
    });
    return height;
}
