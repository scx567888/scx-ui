import {parseDocument} from "htmlparser2";
import {render} from "dom-serializer";

function svgToSymbol(symbolId, content) {
    const dom = parseDocument(content);

    let root = null;

    for (let child of dom.children) {
        if (child.name === "svg") {
            root = child;
            break;
        }
    }

    //未找到 svg 对象则返回 null
    if (root == null) {
        return null;
    }

    // 修改 svg 为 symbol
    root.name = "symbol";
    // 添加 id 属性
    root.attribs["id"] = symbolId;

    const {viewBox, height, width} = root.attribs;

    //为没有 viewBox 的设置 viewBox
    if (viewBox == null && height != null && width != null) {
        root.attribs["viewBox"] = `0 0 ${width} ${height}`;
    }

    //移除 宽高 属性
    delete root.attribs["height"];
    delete root.attribs["width"];

    return render(root);
}

export {
    svgToSymbol,
};
