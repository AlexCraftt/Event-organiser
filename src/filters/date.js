import { deepStrictEqual } from "assert";

export default (value) => {
    const date = new Date(value)
    return date.toLocaleString(['ru'], {month: 'long', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
}