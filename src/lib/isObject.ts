function isObject(obj: unknown) {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

export default isObject;
