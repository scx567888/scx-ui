import {getUUID} from "./get-uuid.js";

class Watermark {
    text;
    timer = null;

    constructor(text = "SCX") {
        this.text = text;
        this.watermarkTextBgDomID = getUUID();
        this.watermarkImage = getWatermarkImage(this.text);
        this.watermarkTextBg = document.createElement("div");
        this.watermarkTextBg.id = this.watermarkTextBgDomID;
        this.setDivStyle(this.watermarkTextBg);

        this.createDom = this.createDom.bind(this);
    }


    setDivStyle(d) {
        d.style.pointerEvents = "none";
        d.style.top = "0px";
        d.style.left = "0px";
        d.style.position = "fixed";
        d.style.zIndex = "990000";
        d.style.width = "100%";
        d.style.height = "100%";
        d.style.background = "url(" + this.watermarkImage + ") left top repeat";
    }

    /**
     * 开启水印
     */
    openWatermark() {
        this.createDom();
        this.removeEvent();
        this.createEvent();
    }

    /**
     * 清除水印
     */
    clearWatermark() {
        this.removeDom();
        this.removeEvent();
    }

    /**
     * 添加水印
     */
    createDom() {
        const domId = document.getElementById(this.watermarkTextBgDomID);
        if (domId) {
            this.setDivStyle(domId);
        } else {
            document.body.appendChild(this.watermarkTextBg);
        }
    }

    removeDom() {
        const domId = document.getElementById(this.watermarkTextBgDomID);
        if (domId) {
            document.body.removeChild(domId);
        }
    }

    createEvent() {
        window.addEventListener("resize", this.createDom);
        this.timer = setInterval(() => {
            this.createDom();
        }, 5000);
    }

    removeEvent() {
        window.removeEventListener("resize", this.createDom);
        clearInterval(this.timer);
        this.timer = null;
    }

}


function getWatermarkImage(text) {

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 200;

    const watermarkText = canvas.getContext("2d");
    watermarkText.rotate((-20 * Math.PI) / 180);
    watermarkText.font = "15px Arial";
    const gradient = watermarkText.createLinearGradient(0, 0, 150, 0);
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(1.0, "blue");
    watermarkText.fillStyle = gradient;
    watermarkText.textAlign = "center";
    watermarkText.textBaseline = "middle";
    watermarkText.fillText(text, canvas.width * 0.3, canvas.height * 0.7);

    return canvas.toDataURL("image/png", 1);
}


export {
    Watermark,
};
