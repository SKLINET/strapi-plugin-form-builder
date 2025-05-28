export function labelToJsonAttribute(label: string) {
    return label
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9 ]+/g, '') // Remove non-alphanumeric characters except spaces
        .trim() // Remove leading/trailing whitespace
        .replace(/\s+(a|and|&)\s+/g, '_') // Replace " a ", " and ", or " & " with underscore
        .replace(/\s+/g, '_'); // Replace remaining spaces with underscores
}
