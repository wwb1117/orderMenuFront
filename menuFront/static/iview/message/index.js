const default_data = {
    visible: false,
    content: '',
    duration: 2,
    type: 'default' // default || success || warning || error
};

let timmer = null;

Component({
    externalClasses: ['i-class'],

    data: default_data,

    methods: {
        handleShow (options) {
            const { type = 'default', duration = 2 } = options;

            var selfData = {}

            for (var kyy in options) {
                selfData[kyy] = options[kyy]
            }

            selfData.type = type
            selfData.duration = duration
            selfData.visible = true

            this.setData(selfData);

            const d = this.data.duration * 1000;

            if (timmer) clearTimeout(timmer);
            if (d !== 0) {
                timmer = setTimeout(() => {
                    this.handleHide();
                    timmer = null;
                }, d);
            }
        },

        handleHide () {
            this.setData(default_data);
        }
    }
});
