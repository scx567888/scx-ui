import {WhereSerializer} from "./WhereSerializer.js";
import {GroupBySerializer} from "./GroupBySerializer.js";
import {OrderBySerializer} from "./OrderBySerializer.js";

class QuerySerializer {

    #whereSerializer;
    #groupBySerializer;
    #orderBySerializer;

    constructor() {
        this.#whereSerializer = new WhereSerializer();
        this.#groupBySerializer = new GroupBySerializer();
        this.#orderBySerializer = new OrderBySerializer();
    }

    serializeQuery(query) {
        return {
            "@type": "Query",
            "where": this.#whereSerializer.serialize(query.getWhere()),
            "groupBy": this.#groupBySerializer.serialize(query.getGroupBy()),
            "orderBy": this.#orderBySerializer.serialize(query.getOrderBy()),
            "offset": query.getOffset(),
            "limit": query.getLimit(),
        };
    }

}

const QUERY_SERIALIZER = new QuerySerializer();

export {
    QuerySerializer,
    QUERY_SERIALIZER,
};
