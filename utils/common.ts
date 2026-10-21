export const preGenerateObjectId = (): string => {
    const uniqueId = (
        Date.now().toString(16) + // timestamp for basic uniqueness
        Math.random().toString(16).slice(2, 8)
    ) // 6 random chars
        .toLowerCase();

    // IMPORTANT Backend is expecting this format.
    return `preId_${uniqueId}`;
};


export const normalizeText = (value: string) => {
    return value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim()
}