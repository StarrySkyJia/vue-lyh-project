import * as api from "@/api/project/project.js";
import Vue from "vue";
import storage from "@/utils/storage";

function initState() {
    return {
        // 加入的项目
        joinProjList: [],
        joinProjCount: 0,
        //  管理的项目
        mangerProjList: [],
        mangerProjCount: 0,
        //  企业的所有项目
        allProjList: [],
        allProjCount: 0,
        // 查询信息
        queryInfo: {},

        // 当前项目id
        currentProjId: 0,
        projectInfo: {},

        // 当前侧边栏
        currentProjTab: "projectDtail",
    };
}

const projectType = {
    joinProj: 1,
    mangerProj: 2,
    allProj: 3,
};

const project = {
    state: initState(),
    actions: {
        // 获取页面数据
        getProjectPageListAction({ commit, rootGetters }, payload) {
            return new Promise((resolve) => {
                const data = payload.queryInfo;
                data.itemType = projectType[payload.pageName];
                data.userId = rootGetters.userId;
                api.getMyProjList(data).then((res) => {
                    commit(`SET_${payload.pageName.toUpperCase()}`, res);
                    commit("SET_QUERY", data);
                    resolve(res.itemInfoModelList);
                });
            });
        },
        refreshProjectStoreAction({ commit }) {
            const projectInfo = storage.get("PROJ_INFO", true);
            if (projectInfo) {
                commit("SET_CURR_PROJ_INFO", projectInfo);
            }

            const projectId = storage.get("PROJ_ID");
            if (projectId) {
                commit("SET_CURR_ID", projectId);
            }

            const currentProjTab = storage.get("PROJ_TAB");
            if (currentProjTab) {
                commit("SET_PROJ_TAB", currentProjTab);
            }
        },
    },
    mutations: {
        SET_JOINPROJ(state, data) {
            state.joinProjList = data.itemInfoModelList;
            state.joinProjCount = data.total;
        },
        SET_MANGERPROJ(state, data) {
            state.mangerProjList = data.itemInfoModelList;
            state.mangerProjCount = data.total;
        },
        SET_ALLPROJ(state, data) {
            state.allProjList = data.itemInfoModelList;
            state.allProjCount = data.total;
        },
        SET_QUERY(state, queryInfo) {
            state.queryInfo = queryInfo;
        },
        SET_CURR_ID(state, itemId) {
            state.currentProjId = itemId;
            storage.set("PROJ_ID", itemId, 30 * 86400);
        },
        SET_CURR_PROJ_INFO(state, info) {
            Vue.set(state, "projectInfo", info);
            storage.set("PROJ_INFO", info, 30 * 86400);
        },
        SET_PROJ_TAB(state, currentProjTab) {
            state.currentProjTab = currentProjTab;
            storage.set("PROJ_TAB", currentProjTab, 30 * 86400);
        },
    },
};

export default project;