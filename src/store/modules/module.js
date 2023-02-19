import * as api from "@/api/module/module.js";
import Vue from "vue";
import storage from "@/utils/storage";

function initState() {
    return {
        // 当前模块id
        moduleInfo: {},
        moduleList: [],
    };
}

const module = {
    state: initState(),
    actions: {
        async getAllModuleAction({ state, commit, rootGetters }, payload) {
            const data = {
                condition: "",
                itemId: rootGetters.currentProjId,
                moduleType: 0,
                pageNum: 0,
                pageSize: 99,
            };
            let res = await api.getModuleList(data);
            commit("SET_MODULE_LIST", res.moduleInfoVOList);
        },
        refreshModuleStoreAction({ commit }) {
            const moduleList = storage.get("SET_MODULE_LIST", true);
            if (moduleList) {
                commit("SET_MODULE_LIST", moduleList);
            }

            const moduleInfo = storage.get("MODULE_INFO", true);
            if (moduleInfo) {
                commit("SET_CURR_MODULE_INFO", moduleInfo);
            }
        },
    },
    mutations: {
        SET_MODULE_LIST(state, moduleList) {
            state.moduleList = [];
            moduleList.forEach((module, index) => {
                Vue.set(state.moduleList, index, module);
            });
            state.moduleList = JSON.parse(JSON.stringify(state.moduleList));
            storage.set("MODULE_INFO", moduleList, 30 * 86400);
        },
        SET_CURR_MODULE_INFO(state, info) {
            Vue.set(state, "moduleInfo", info);
            storage.set("MODULE_INFO", info, 30 * 86400);
        },
    },
};

export default module;