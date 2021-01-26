export default {
    template: '\
        <div>\
            <div class="vjk-modal-overlay" :class="{\'vjk-modal-show\': visible}"></div>\
            <div class="vjk-modal-container" :class="{\'vjk-modal-show\': visible}">\
                <div class="vjk-modal-container_i">\
                    <div :class="containerI2Class">\
                        <slot :hide="hide"/>\
                    </div>\
                </div>\
            </div>\
        </div>\
    ',
    props: {
        name: {
            required: true,
            type: String,
        },
        verticalAlign: {
            type: String,
            default: 'middle',
        },
    },
    data() {
        return {
            visible: false,
        };
    },
    computed: {
        containerI2Class() {
            let classes = {
                'vjk-modal-container_i2': true,
            };
            classes['vjk-modal-va-' + this.verticalAlign] = true;
            return classes;
        },
    },
    methods: {
        show() {
            this.visible = true;
            this.$modal.$emit('shown', this.name);
        },
        hide() {
            this.visible = false;
            this.$modal.$emit('hidden', this.name);
        },
    },
    beforeMount() {
        let self = this;
        this.$modal.$on('show', function(name) {
            if (self.name === name) {
                self.show();
            }
        });
        this.$modal.$on('hide', function(name) {
            if (self.name === name) {
                self.hide();
            }
        });
    },
};