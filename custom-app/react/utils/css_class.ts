export default function css_class(...selectors: string[]):string {
    return selectors.join(" ");
}
