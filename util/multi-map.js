class MultiMap {

    map = {};

    clear() {
        this.map = {};
    }

    delete(key, value) {
        const values = this.map[key];
        if (values) {
            let index = values.indexOf(value);
            //可能会添加多个
            while (index !== -1) {
                values.splice(index, 1);
                index = values.indexOf(value);
            }
            if (values.length === 0) {
                delete this.map[key];
            }
        }
    }

    forEach(callback) {
        for (let mapKey in this.map) {
            const mapValues = this.map[mapKey];
            for (let mapValue of mapValues) {
                callback(mapKey, mapValue);
            }
        }
    }

    get(key) {
        return key in this.map ? this.map[key] : [];
    }

    has(key) {
        return key in this.map;
    }

    set(key, value) {
        if (key in this.map) {
            this.map[key].push(value);
        } else {
            this.map[key] = [value];
        }
    }

}

export {MultiMap};
