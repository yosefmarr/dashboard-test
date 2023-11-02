export const toPascalCase = (str) => {
  return str.replace(/(?:^\w|[_-]\w)/g, (match) =>
    match.charAt(match.length - 1).toUpperCase()
  );
};
