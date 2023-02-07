const getters = {
    token: (state) => state.user.token,
    userInfo: (state) => state.user.userInfo,
    userId: (state) => state.user.userInfo.userId,
    userRoutes: (state) => state.user.userRoutes,
};

export default getters;