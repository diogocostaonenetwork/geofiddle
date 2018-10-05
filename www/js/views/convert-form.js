define([

    'backbone',
    'mdc',
    'views/format-select',
    'views/projection-select',
    'text!templates/convert-form.html'

], function (Backbone, mdc, FormatSelectView, ProjectionSelectView, tpl) {

    return Backbone.View.extend({

        options: {
            label: 'Enter some WKT, or GeoJSON to be converted'
        },

        events: {
            'keyup textarea': 'setValue'
        },

        setValue: function(ev) {
            var $i = $(ev.currentTarget);
            this.model.set('text', $i.val());
        },

        renderFormatSelect: function() {
            this.formatSelectView = new FormatSelectView({
                model: this.model,
                attr: 'format'
            });
            this.$el.find('.form-toolbar').append(this.formatSelectView.el);
            this.formatSelectView.render();
        },

        renderProjectionSelect: function() {
            this.projectionSelectView = new ProjectionSelectView({
                model: this.model,
                attr: 'projection'
            });
            this.$el.find('.form-toolbar').append(this.projectionSelectView.el);
            this.projectionSelectView.render();
        },

        renderToolbar: function() {
            this.renderFormatSelect();
            this.renderProjectionSelect();
        },

        renderTextArea: function() {
            var $textarea = this.$el.find('textarea');
            this.$el.find('.convert-input-label').text(this.options.label);

            this.mdcTextField = mdc.textField.MDCTextField.attachTo(this.$el.find('.mdc-text-field')[0]);
            this.mdcTextField.disabled = !!this.options.disabled;

            $textarea.focus();
        },

        render: function() {
            var html = _.template(tpl, {});
            this.$el.html(html);

            this.renderToolbar();
            this.renderTextArea();

            return this;
        }

    });

});
