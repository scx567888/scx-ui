import scxConfig from '../../scx.config'

const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 200;

const watermarkText = canvas.getContext('2d');
watermarkText.rotate((-20 * Math.PI) / 180);
watermarkText.font = '15px Arial';
const gradient = watermarkText.createLinearGradient(0, 0, 150, 0);
gradient.addColorStop(0, "magenta");
gradient.addColorStop(1.0, "blue");
watermarkText.fillStyle = gradient;
watermarkText.textAlign = 'center';
watermarkText.textBaseline = 'middle';
watermarkText.fillText(scxConfig.waterMark.text || scxConfig.title, canvas.width * 0.3, canvas.height * 0.7);

const watermarkTextData = canvas.toDataURL('image/png', 1)

const watermarkTextBg = document.createElement('div');
watermarkTextBg.id = 'watermark-dom';
setDivStyle(watermarkTextBg)

let timer = null;


function openWatermark() {
    createWatermark();
    window.addEventListener('resize', () => createWatermark());
    timer = setInterval(() => {
        createWatermark()
    }, 5000);
}

//添加水印
function createWatermark() {
    const domId = document.getElementById('watermark-dom');
    if (domId) {
        setDivStyle(domId)
    } else {
        document.body.appendChild(watermarkTextBg);
    }
}

//清除水印
function clearWatermark() {
    const domId = document.getElementById('watermark-dom');
    domId && document.body.removeChild(domId);
}

function setDivStyle(d) {
    d.style.pointerEvents = 'none';
    d.style.top = '0px';
    d.style.left = '0px';
    d.style.position = 'fixed';
    d.style.zIndex = '990000';
    d.style.width = '100%';
    d.style.height = '100%';
    d.style.background = 'url(' + watermarkTextData + ') left top repeat';
}

export {
    openWatermark,
    clearWatermark
}