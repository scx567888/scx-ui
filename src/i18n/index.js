import elementEnLocale from 'element-plus/lib/locale/lang/en' // element-ui 控件语言  英文
import elementZhCNLocale from 'element-plus/lib/locale/lang/zh-cn' // element-ui 控件语言 中文
import {state} from '../store'
import {getI18nModule} from "../utils";

const enLocale = getI18nModule(import.meta.globEager('./en/**/*.js'))
const zh_cnLocale = getI18nModule(import.meta.globEager('./zh-cn/**/*.js'))

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    'zh-cn': {
        ...zh_cnLocale,
        ...elementZhCNLocale
    }
};

export function t(keyPath) {
    const nowLocalMessage = messages[state.setting.language];
    try {
        const t_value = keyPath.split('.').reduce((previous, current) => previous[current], nowLocalMessage);
        return t_value ? t_value : keyPath;
    } catch (e) {
        console.warn('没有在' + state.setting.language + '中找到' + keyPath)
        return keyPath
    }
}

//安装全局国际化
export default {
    install: (app) => app.config.globalProperties.$t = t
};