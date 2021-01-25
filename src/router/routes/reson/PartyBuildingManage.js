import Layout from '/@/layout/index.vue'

export default {
    path: '/party-building-manage',
    component: Layout,
    redirect: '/party-building-manage/party-branch-manage',
    alwaysShow: true, //总在根目录显示
    name: 'partyBuildingManage',
    icon: 'communist-party-of-china',
    children: [
        {
            path: 'party-branch-manage',
            component: () => import('/@/views/reson/partyBuildingManage/partyBranchManage.vue'),
            name: 'partyBranchManage',
            perms: []
        },
        {
            path: 'apply-join-party-people-manage',
            component: () => import('/@/views/reson/partyBuildingManage/applyJoinPartyPeopleManage.vue'),
            name: 'applyJoinPartyPeopleManage',
            perms: []
        },
        {
            path: 'party-member-manage',
            component: () => import('/@/views/reson/partyBuildingManage/partyMemberManage.vue'),
            name: 'partyMemberManage',
            perms: []
        },
        {
            path: 'probationary-party-member-manage',
            component: () => import('/@/views/reson/partyBuildingManage/probationaryPartyMemberManage.vue'),
            name: 'probationaryPartyMemberManage',
            perms: []
        }
    ]
}
