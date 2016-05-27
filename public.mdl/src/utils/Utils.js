export function clone(obj) {
  return Object.assign({}, obj);
}

export function isImage(val){
  if (!val) return false;
  return val.match(/(.png|.jpg|.gif|jpeg|.svg)/i);
}


export function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
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
