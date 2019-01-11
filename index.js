const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = function(source) {
  const entry = getEntry(this.options.entry);
  const matched = entry.some((i => {
    return i === this.resource
  }));

  if(!matched) {
    return source;
  }

  const query = loaderUtils.getOptions ? loaderUtils.getOptions(this) : loaderUtils.parseQuery(this.query);
  const theme = query.theme;
  const base = query.base || '@alifd/next';

  const reset = `import "${base}/reset.scss";\n`; 
  const icon = theme ? `import "${theme}/icons.scss";\n` : '';

  return `${reset}${icon}${source}`;
};

function getEntry(entry) {
  return Object.keys(entry).map(k => {
    const l = entry[k];
    if(Array.isArray(l)) {
      return path.resolve(l[l.length - 1]);
    } else {
      return path.resolve(l);
    }
  });
}
