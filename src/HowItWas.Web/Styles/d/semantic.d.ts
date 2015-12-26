/* *****************************************************************************
Copyright (c) DioLive Studio. All rights reserved. 
Licensed under the MIT License.
***************************************************************************** */

interface JQuery {
    dropdown(action: string, arg1?: string, arg2?: string): JQuery;
    dropdown(options?: Object): JQuery;

    form(options: FormOptions): JQuery;
    form(action: string, arg1: string, arg2: string): JQuery;
    form(action: string, values?: Object): (JQuery | any);

    modal(action: string): JQuery;
    modal(options?: Object): JQuery;

    transition(action: string): JQuery;

    shape(action: string): JQuery;
}

interface FormOptions {
    on?: string;
    fields?: Object
}