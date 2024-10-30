
export function shuffle(input) {
    let arr = typeof input === 'string' ? input.split('') : [...input];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return typeof input === 'string' ? arr.join('') : arr;
  }
  