export function trimString(input: string, maxLength: number = 30): string {
    if (input.length > maxLength) {
        return input.slice(0, maxLength - 3) + '...';
    }
    return input;
}
