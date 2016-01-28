(function ($, mainUIElement) {
    'use strict';

    var FALSE                           = false,
        AMOUNT_OF_INPUTS                = 6,
        MAX_PASSWORD_INPUT_LENGTH       = 1,
        CLASS_TOKEN                     = '.',
        PASSWORD_INPUT_CLASS_NAME       = 'password',
        PASSWORD_INPUT_SELECTOR         = CLASS_TOKEN + PASSWORD_INPUT_CLASS_NAME,
        LABEL_CLASS_NAME                = PASSWORD_INPUT_CLASS_NAME + '-wrapper',
        SUBMIT_PASSWORD_FORM_EVENT_NAME = 'SUBMIT_PASSWORD_FORM',
        PASSWORD_INPUT_DEFAULT_LENGTH   = 0;

    PasswordInput = React.createClass({
        getInitialState: function () {
            return {
                autoSubmit: this.props.autoSubmit || FALSE
            };
        },
        handlePasswordInputKeyUp: function (event) {
            var element = event.target,
                elementValue = element.value,
                elementLength = (elementValue) ? elementValue.length : PASSWORD_INPUT_DEFAULT_LENGTH;

            if (elementLength >= MAX_PASSWORD_INPUT_LENGTH) {
                if (this.state.autoSubmit && this.isPasswordLengthCorrect()) {
                    this.submitForm();
                    return FALSE;
                }

                this.focusNextSibling(element);
            }
        },
        focusNextSibling: function (element) {
            if (element.nextSibling) {
                element.nextSibling.focus();
            }
        },
        isPasswordLengthCorrect: function () {
            var counter         = 0,
                passwordInputs  = document.querySelectorAll(PASSWORD_INPUT_SELECTOR);

            Array.prototype.slice.call(passwordInputs).map(function (element) {
                if (element.value && (element.value.length === MAX_PASSWORD_INPUT_LENGTH)) {
                    ++counter;
                }
            });

            return counter >= AMOUNT_OF_INPUTS;
        },
        submitForm: function () {
            $(mainUIElement).trigger(SUBMIT_PASSWORD_FORM_EVENT_NAME);
        },
        getPasswordInputs: function () {
            var index,
                passwordInputs = [];

            for (index = 0; index < AMOUNT_OF_INPUTS; ++index) {
                passwordInputs.push(
                    <input
                        type="password"
                        maxLength={ MAX_PASSWORD_INPUT_LENGTH }
                        className={ PASSWORD_INPUT_CLASS_NAME }
                        onKeyUp={ this.handlePasswordInputKeyUp }
                        key={ index }
                    />
                );
            }

            return passwordInputs;
        },
        render: function () {
            return (
                <label className={ LABEL_CLASS_NAME } htmlFor={ PASSWORD_INPUT_CLASS_NAME }>
                    { this.getPasswordInputs() }
                </label>
            );
        }
    });
})(jQuery, 'body');
