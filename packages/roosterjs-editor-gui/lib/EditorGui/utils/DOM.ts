export default class DOM {
    static text(value: string): Node {
        return document.createTextNode(value);
    }

    static div(clazz?: string, children?: Node[]): HTMLDivElement {
        let div = document.createElement('div');

        if (clazz) {
            div.className = clazz;
        }

        if (children) {
            children.forEach(e => {
                div.appendChild(e);
            });
        }

        return div;
    }
}
