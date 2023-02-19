import Vue from "vue";
import router from "../../router";
import storage from "@/utils/storage";
import { clearState } from "../index.js";
import { passwordLogin, phoneLogin } from "@/api/login/login";
import { mapFileToRoutes } from "@/utils/map-router.js";
import { getMessageList } from "@/api/message";

function initState() {
    return {
        userInfo: {},
        token: "",
        userRoutes: [],
        messageNum: 0,
    };
}

const user = {
    // 初始数据，便于清空
    state: initState(),
    actions: {
        // 账号密码登录
        passwordLoginAction({ commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                passwordLogin(data)
                    .then((res) => {
                        resolve(res);
                        loginSuccess(commit, dispatch, res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        // 账号密码登录
        phoneLoginAction({ commit, dispatch }, data) {
            return new Promise((resolve, reject) => {
                phoneLogin(data)
                    .then((res) => {
                        resolve(res);
                        loginSuccess(commit, dispatch, res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }, // 退出登录
        logoutAction({ commit }) {
            return new Promise((resolve) => {
                // 清空用户数据
                storage.remove(["USER_INFO", "ACCESS_TOKEN"]);
                commit("CLEAR_USER_STATE");
                resolve();
                storage.clear();
            });
        },
        // 获取信息数量
        getMessageAction({ state, commit }) {
            console.log("更新信息！");
            const query = {
                isRead: 1,
                messageType: 0,
                pageNum: 0,
                pageSize: 10,
                userId: state.userInfo.userId,
            };
            getMessageList(query).then((res) => {
                commit("SET_MESSAGE", res.total);
            });
        },
        // 刷新后缓存中获取数据,在仓库中导出，并在main中执行
        refreshLoadAction({ commit }) {
            const token = storage.get("ACCESS_TOKEN");
            if (token) {
                commit("SET_TOKEN", token);
            }

            const userInfo = storage.get("USER_INFO", true);
            if (userInfo) {
                commit("SET_USER_INFO", userInfo);
            }

            const allRoutes = addRoute(userInfo.roleId);
            if (allRoutes) {
                commit("SET_ROUTES", allRoutes);
            }
        },
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER_INFO(state, userInfo) {
            // 对象和数组不会响应式监听到getters，导致mapGetters也会出错
            Vue.set(state, "userInfo", userInfo);
            // state.userInfo = userInfo;
        },
        SET_ROUTES(state, routes) {
            state.userRoutes = [];
            routes.forEach((route) => {
                state.userRoutes.push(route);
            });
        },
        CLEAR_USER_STATE(state) {
            clearState(state, initState());
        },
        SET_MESSAGE(state, messageNum) {
            console.log(messageNum);
            state.messageNum = messageNum;
        },
    },
};

function loginSuccess(commit, dispatch, { authorization, user }) {
    // 过期时间为30天
    const expiryTime = 30 * 86400;
    // 路由信息
    const userRoutes = addRoute(user.roleId);
    // 将信息存到缓存中
    storage.set("USER_INFO", user, expiryTime);
    storage.set("ACCESS_TOKEN", authorization, expiryTime);
    // storage.set("USER_ROUTES", userRoutes, expiryTime);

    // 同步存到vuex中
    commit("SET_USER_INFO", user);
    commit("SET_TOKEN", authorization);
    commit("SET_ROUTES", userRoutes);

    //登录成功后回到首页
    if (user.roleId === 2) {
        router.push("/department");
    } else {
        router.push("/allProject");
    }
}

// 从映射函数中获取到路由信息
// 在这里进行递归遍历添加
// 递归添加的路由不需要存储，而存储完整的路由信息，提供给sidemenu使用
function addRoute(roleId) {
    let allRoutes = [];

    if (parseInt(roleId) === 2) {
        allRoutes = mapFileToRoutes("admin");
    } else {
        allRoutes = mapFileToRoutes("main");
        // 添加项目空间路由
        const projectSpaceRoutes = mapFileToRoutes("project");
        projectSpaceRoutes.forEach((route) => {
            router.addRoute("index", route);
        });
    }

    // 递归遍历并添加到route中
    const _resurseGerRoute = (_allRoutes) => {
        for (const route of _allRoutes) {
            if (Object.hasOwn(route, "children")) {
                route.children.forEach((childrenRoute) => {
                    childrenRoute.path = route.path + "/" + childrenRoute.path;
                });
                _resurseGerRoute(route.children);
                router.addRoute("index", route);
            } else {
                router.addRoute("index", route);
            }
        }
    };
    _resurseGerRoute([...allRoutes]);
    return allRoutes;
}

export default user;