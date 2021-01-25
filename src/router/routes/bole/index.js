import ActivityRoutes from "./Activity";
import CourseRoutes from "./Course";
import MerchantRoutes from "./Merchant";
import OrderCodeRoutes from "./OrderCode";
import StoreManageRoutes from "./StoreManage";
import TeacherRoutes from "./Teacher";

export default {
    name: 'bole',
    modules: [
        ActivityRoutes,
        CourseRoutes,
        MerchantRoutes,
        OrderCodeRoutes,
        StoreManageRoutes,
        TeacherRoutes
    ]
}
