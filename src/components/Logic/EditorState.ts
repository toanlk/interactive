import { observable, computed } from 'mobx';

export class EditorState {

    @observable styles: any;

    constructor() {
        this.styles = {
            color: '#ffffff',
            padding: '15px 20px',
            backgroundColor: '#2196f3',
            display: 'inline-block',
            textAlign: 'center',
        }
    }

    updateStyles(styles: any) {
        styles = rtrim(styles, ';');
        styles = styles.split(';').join(',');
        styles = '{' + styles + '}';

        //console.log(styles);

        try {
            this.styles = JSON.parse(styles);
        } catch (e) {
            //console.error(e);
        }
    }

    getCssText() {
        let text = JSON.stringify(this.styles);
        let css_rows = text.replace('{', '').replace('}', '').split(',');

        let css = '';

        for (let elem of css_rows) {
            css = css + elem + ';' + "\n";
        }

        return css;
    }

    @computed get numberOfObjects() {
        return Object.keys(this.styles).length;
    }
}

export function rtrim(str: string, ch: string) {
    str = str.trim();
    if (str.charAt(str.length - 1) == ch) {
        str = str.substring(0, str.length - 1);
    }

    return str;
}