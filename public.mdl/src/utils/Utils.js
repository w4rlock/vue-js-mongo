export function clone(obj) {
  return Object.assign({}, obj);
}

export function filter(data, key, value, cant = null) {
  let m = data.filter(o => o[key] == value);
  if (m.length == 0)
    return null;

  if (!cant)
    return m;

  if (cant == 1)
    return m[0]

  return m.slice(0, cant);
}

