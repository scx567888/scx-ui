import OrganizationManageRoutes from "./OrganizationManage";
import PermissionManageRoutes from "./PermissionManage";
import UserManageRoutes from "./UserManage";
import InstantMessaging from "./InstantMessaging";

export default {
    name: 'core',
    modules: [
        UserManageRoutes,
        PermissionManageRoutes,
        OrganizationManageRoutes,
        InstantMessaging
    ]
}
