import CooperativeOfficeRoutes from "./CooperativeOffice";
import DataCenterRoutes from "./DataCenter";
import EducationalManageRoutes from "./EducationalManage";
import GeneralAffairsManageRoutes from "./GeneralAffairsManage";
import MajorManageRoutes from "./MajorManage";
import PartyBuildingManageRoutes from "./PartyBuildingManage";
import PersonnelWorkRoutes from "./PersonnelWork";
import StudentWorkRoutes from "./StudentWork";
import SystemRoutes from "./System";

export default {
    name: 'reson',
    modules: [
        CooperativeOfficeRoutes,
        DataCenterRoutes,
        EducationalManageRoutes,
        GeneralAffairsManageRoutes,
        MajorManageRoutes,
        PartyBuildingManageRoutes,
        PersonnelWorkRoutes,
        StudentWorkRoutes,
        SystemRoutes
    ]
}
