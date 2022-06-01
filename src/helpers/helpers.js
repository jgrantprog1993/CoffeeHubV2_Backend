//https://gist.github.com/niksumeiko/6777429
const helpers = (Handlebars) => {
Handlebars.registerHelper("ifEquals", function(a, b, options) {
    if (a === b) {
      return options.fn(this);
    }
  
    return options.inverse(this);
  });
}
export default helpers;