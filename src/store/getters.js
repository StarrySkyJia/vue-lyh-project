const getters = {
    token: (state) => state.user.token,
    userInfo: (state) => state.user.userInfo,
    userId: (state) => state.user.userInfo.userId,
    userRoutes: (state) => state.user.userRoutes,
    isAdmin: (state) => (state.user.userInfo.roleId == 2 ? true : false),
    currentProjId: (state) => state.project.currentProjId,
    projectInfo: (state) => state.project.projectInfo,
    isProjManger: (state) =>
        state.project.projectInfo.managerId === state.user.userInfo.userId,
    moduleInfo: (state) => state.module.moduleInfo,
    moduleList: (state) => state.module.moduleList,
};

export default getters;