import ToastComponent from './Toast.vue';

const Toast = {
  install: (Vue, options = {}) => {
    let preset = {
      duration: 2400,
      align: 'center',
      callback: null
    };
    Object.assign(preset, options);

    Vue.prototype.$toast = (message, options = {}) => {
      Object.assign(preset, options);

      const Tc = Vue.extend(ToastComponent);
      const instance = new Tc().$mount(document.createElement('div'));

      instance.message = message;
      instance.visible = true;

      document.body.appendChild(instance.$el);

      setTimeout(() => {
        instance.visible = false;
        setTimeout(() => {
          document.body.removeChild(instance.$el);
          if (preset.callback) {
            preset.callback();
          }
        }, 500);
      }, preset.duration);
    };
  }
};

export default Toast;
