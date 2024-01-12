export const api = async () => {
    const req = await fetch('https://jsonplaceholder.typicode.com/todos');
    const res = await req.json()
    return res
}