import v3Crontab_ from './components/Crontab.vue'

const components = [v3Crontab_];

const install = function(Vue) {
  components.map((component) => {
    Vue.component(component.name, component);
  });
};
/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export const V3Crontab = v3Crontab_;

export default {
  install,
};
