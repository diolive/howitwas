var Rule = (function () {
    function Rule(type, prompt) {
        this.type = type;
        this.prompt = prompt;
    }
    return Rule;
})();
var rules = {
    empty: function (prompt) {
        return new Rule('empty', prompt);
    },
    email: function (prompt) {
        return new Rule('email', prompt);
    },
    match: function (anotherField, prompt) {
        return new Rule('match[' + anotherField + ']', prompt);
    },
    maxLength: function (maxLength, prompt) {
        return new Rule('length[' + maxLength + ']', prompt);
    }
};
$(function () {
    $.fn.form.settings.defaults = {
        email: {
            identifier: 'Email',
            rules: [
                rules.empty('Please enter your e-mail'),
                rules.email('Please enter a valid e-mail')
            ]
        },
        password: {
            identifier: 'Password',
            rules: [
                rules.empty('Please enter your password')
            ]
        },
        newPassword: {
            identifier: 'NewPassword',
            rules: [
                rules.empty('Please enter your password'),
                rules.maxLength(6, 'Your password must be at least 6 characters')
            ]
        },
        confirmPassword: {
            identifier: 'ConfirmPassword',
            rules: [
                rules.match('NewPassword', 'Password and confirmation should be same')
            ]
        }
    };
    $('.ui.form.login').form({
        on: 'blur'
    });
    $('.ui.form.register').form({
        on: 'blur'
    });
    $('.flip-trigger').click(function () {
        $('.shape').shape(Math.random() < 0.5 ? 'flip over' : 'flip back');
        clearFormErrors();
    });
    function clearFormErrors() {
        setTimeout(function () { return $('.form.error, .field.error').removeClass('error'); }, 1000);
    }
});
