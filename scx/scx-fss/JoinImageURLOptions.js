class JoinImageURLOptions {

    /**
     * width 的简写形式
     * @type {Number}
     */
    w;

    /**
     * height 的简写形式
     * @type {Number}
     */
    h;

    /**
     * type 的简写形式
     * @type {String}
     */
    t;

    /**
     * 优先级大于 w
     * @type {Number}
     */
    width;

    /**
     * 优先级大于 h
     * @type {Number}
     */
    height;

    /**
     * 优先级大于 t
     * @type {String}
     */
    type;
}

export {
    JoinImageURLOptions,
};
