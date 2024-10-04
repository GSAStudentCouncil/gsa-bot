Array.prototype.flat || (Array.prototype.flat = function (t, r) {
  return r = this.concat.apply([], this), t > 1 && r.some(Array.isArray) ? r.flat(t - 1) : r;
}, Array.prototype.flatMap = function (t, r) {
  return this.map(t, r).flat();
});
String.prototype.replaceAll || (String.prototype.replaceAll = function (t, r) {
  return this.split(t).join(r);
});
const getJosa = (str, josaPair) => {
  const lastChar = str.charCodeAt(str.length - 1);
  const hasFinalConsonant = (lastChar - 44032) % 28 !== 0;
  const isFinalRieul = (lastChar - 44032) % 28 === 8;
  const josaMap = {
    '이가': hasFinalConsonant ? '이' : '가',
    '은는': hasFinalConsonant ? '은' : '는',
    '을를': hasFinalConsonant ? '을' : '를',
    '으로': hasFinalConsonant && !isFinalRieul ? '으로' : '로',
    '와과': hasFinalConsonant ? '과' : '와'
  };
  return str + josaMap[josaPair];
};
Object.defineProperties(String.prototype, {
  '이가': {
    get() {
      return getJosa(this, '이가');
    }
  },
  '은는': {
    get() {
      return getJosa(this, '은는');
    }
  },
  '을를': {
    get() {
      return getJosa(this, '을를');
    }
  },
  '으로': {
    get() {
      return getJosa(this, '으로');
    }
  },
  '와과': {
    get() {
      return getJosa(this, '와과');
    }
  }
});
const shortURL = url => org.jsoup.Jsoup.connect(`https://tinyurl.com/api-create.php?url=${url}`).get().text().substring('https://'.length);
const prettyBytes = bytes => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let i = 0;
  while (bytes >= 1024 && ++i) bytes /= 1024;
  return `${bytes.toFixed(2)} ${units[i]}`;
};
const prettyDuration = seconds => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor(seconds % 3600 / 60)).padStart(2, '0');
  const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
  return (hours !== "00" ? `${hours}: ` : '') + `${minutes}:${secs}`;
};
exports.isNumber = name => /^\d+$/.test(name);
exports.isNaN = n => Number.isNaN(n);
exports.compress = '\u200b'.repeat(500);
exports.getJosa = getJosa;
exports.isValidChannel = channel => channel != null && channel.send != null;
exports.shortURL = shortURL;
exports.prettyBytes = prettyBytes;
exports.prettyDuration = prettyDuration;