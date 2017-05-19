const regex = /(\/?files)(\/(\d+))*/;

export function getParam(path) {
  const match = regex.exec(path);
  return match && match[3];
}

export function parsePath(path) {
  const match = regex.exec(path);

  return {
    matched: match !== null,
    fullPath: match && match[0],
    param: match && match[3]
  }
}