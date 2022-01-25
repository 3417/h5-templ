let refreshTitle = {};
refreshTitle.install = function (Vue) {
  Vue.refreshTitle = Vue.prototype.refreshTitle = function (title) {
    document.title = title;
  };
};

export default refreshTitle;