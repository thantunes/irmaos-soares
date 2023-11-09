export default function objToArray(obj: any): any[] {
    const arr = [];
    for (const [key, value] of Object.entries(obj)) {
        arr.push({[key]: value});
    }
    return arr;
}
