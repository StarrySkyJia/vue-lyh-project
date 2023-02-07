import * as roleApi from "@/api/admin/role.js";
import * as projectApi from "@/api/admin/project.js";
import * as departmentApi from "@/api/admin/department";
import * as userApi from "@/api/admin/user";

const adminApis = {
    ...roleApi,
    ...userApi,
    ...departmentApi,
    ...projectApi,
};

// const addDataApis = {
//     role: roleApi.addRole,
//     project: projectApi.addProject,
//     department: departmentApi.addDepartment,
//     user: userApi.addUser,
// };

function initState() {
    return {
        // 用户
        userList: [],
        userCount: 0,
        //   角色
        roleList: [],
        roleCount: 0,
        //   部门
        departmentList: [],
        departmentCount: 0,
        //   项目
        projectList: [],
        projectCount: 0,
        queryInfo: {},
    };
}

const admin = {
    state: initState(),
    actions: {
        // 获取页面列表数据Acton
        getPageTableListAction({ commit }, payload) {
            return new Promise((resolve) => {
                // 1.获取pageUrl,通过传入的路径string，来动态拼接url
                // 代替了之前直接接受url，所以要在调用的组件中把url动态改成pageName
                const pageName = payload.pageName;
                const apiName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);

                // 2.对页面发送请求，获得服务器返回的数据
                adminApis[`get${apiName}List`](payload.queryInfo).then((pageResult) => {
                    commit(`SET_${pageName.toUpperCase()}`, pageResult);
                    commit("SET_QUERY", payload.queryInfo);
                    resolve(pageResult);
                });
            });
        },
        // 新增页面数据
        addPageDataAction({ state, dispatch }, payload) {
            return new Promise((resolve) => {
                const pageName = payload.pageName;
                const apiName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
                adminApis[`add${apiName}`](payload.data).then(() => {
                    dispatch("getPageTableListAction", {
                        pageName,
                        queryInfo: state.queryInfo,
                    });
                    resolve();
                });
            });
        },
        // 修改页面数据
        updateDataAction({ dispatch, state }, payload) {
            return new Promise((resolve) => {
                const pageName = payload.pageName;
                const apiName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
                adminApis[`update${apiName}`](payload.data).then(() => {
                    dispatch("getPageTableListAction", {
                        pageName,
                        queryInfo: state.queryInfo,
                    });
                    resolve();
                });
            });
        },
        // 删除页面数据
        deleteDateAction({ dispatch, state }, payload) {
            return new Promise((resolve) => {
                const pageName = payload.pageName;
                const apiName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
                adminApis[`delete${apiName}`](payload.data).then(() => {
                    dispatch("getPageTableListAction", {
                        pageName,
                        queryInfo: state.queryInfo,
                    });
                    resolve();
                });
            });
        },
    },
    mutations: {
        // 存储信息
        SET_USER(state, data) {
            state.userList = data.users;
            state.userCount = data.total;
        },
        SET_ROLE(state, data) {
            state.roleList = data.roleList;
            state.roleCount = data.total;
        },
        SET_DEPARTMENT(state, data) {
            state.departmentList = data.departmentList;
            state.departmentCount = data.total;
        },
        SET_PROJECT(state, data) {
            state.projectList = data.itemInfoModelList;
            state.projectCount = data.total;
        },
        SET_QUERY(state, queryInfo) {
            state.queryInfo = queryInfo;
        },
    },
};
export default admin;