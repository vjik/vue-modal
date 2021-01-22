import Vue from 'vue';
import 'bulma/css/bulma.css';

import ModalPlugin from '../../src/plugin';
import VModal from '../../src/modal';

Vue.use(ModalPlugin);

new Vue({
    el: '#demo',
    methods: {
        show(name) {
            this.$modal.show(name);
        },
    },
    components: {
        VModal,
    },
});