export const getDateParts = (date?: Date): [number, number, number] => {
    const day = date || new Date();
    return [day.getFullYear(), day.getMonth(), day.getDate()]
}

export const dateToISODate = (date: Date) => date.toLocaleDateString().split('.').reverse().join('-');  