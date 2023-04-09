export const capitalizeWords = (string: string) => {

    const capitalizedWords = string.split(" ").map((word) => {
        const firstLetter = word.slice(0, 1)
        const restLetters = word.slice(1)
        return firstLetter.toUpperCase() + restLetters.toLowerCase()
    }).join(" ")

    return capitalizedWords
};