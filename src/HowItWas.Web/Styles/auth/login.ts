class Rule {
    public type: string;
    public prompt: string;

    constructor(type: string, prompt?: string) {
        this.type = type;
        this.prompt = prompt;
    }
}

var rules = {
    empty: (prompt?: string): Rule => {
        return new Rule('empty', prompt);
    },
    email: (prompt?: string): Rule => {
        return new Rule('email', prompt);
    },
    match: (anotherField: string, prompt?: string): Rule => {
        return new Rule('match[' + anotherField + ']', prompt);
    },
    maxLength: (maxLength: number, prompt?: string): Rule => {
        return new Rule('length[' + maxLength + ']', prompt);
    }
};

$(() => {
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

    $('.flip-trigger').click(() => {
        $('.shape').shape(Math.random() < 0.5 ? 'flip over' : 'flip back');
        clearFormErrors();
    });

    function clearFormErrors() {
        setTimeout(() => $('.form.error, .field.error').removeClass('error'), 1000);
    }
});