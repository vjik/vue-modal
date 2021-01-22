import Vue from 'vue';
import './core.css';

const eventBus = new Vue();

const modal = {
    $emit() {
        eventBus.$emit.apply(eventBus, arguments);
    },
    $on() {
        eventBus.$on.apply(eventBus, arguments);
    },
    show(name) {
        eventBus.$emit('show', name);
    },
    hide(name) {
        eventBus.$emit('hide', name);
    },
};

const scrollWrap = {
    el: null,
    originalOverflow: null,

    onShow() {
        this.originalOverflow = this.el.style.overflowY;
        this.el.style.overflowY = 'hidden';
    },

    onHide() {
        this.el.style.overflowY = this.originalOverflow;
    },

    init(tag) {
        this.el = document.getElementsByTagName(tag)[0];
    },
};
scrollWrap.init('html');

let modalsCounter = 0;
modal.$on('shown', function() {
    if (modalsCounter === 0) {
        scrollWrap.onShow();
    }
    modalsCounter++;
});
modal.$on('hidden', function() {
    modalsCounter--;
    if (modalsCounter === 0) {
        scrollWrap.onHide();
    }
});

export default {
    install: function(Vue) {
        if (!Vue.prototype.hasOwnProperty('$modal')) {
            Vue.prototype.$modal = modal;
        }
    },
};