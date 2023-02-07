import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import admin from "./modules/admin";
import getters from "./getters";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { user, admin },
    getters,
});

// 刷新后从缓存中获取用户信息
export function setupStore() {
    store.dispatch("refreshLoadAction");
}

export default store;

/**
 * 重置某个modules模块的state数据
 * @param {*} state 现有的state数据
 * @param {*} initState 初始的state数据
 */
export function clearState(state, initState) {
    // 先判断是否有后加的数据，如果有，则删除
    // 通过遍历现有的statekey，去对比初始的key
    Object.keys(state).forEach((key) => {
        if (!initState.hasOwnProperty.call(key)) {
            // 如果初始的initState里面没有state的key，则把这个key删除
            delete state[key];
        } else {
            // 如有这个key，则赋值为默认值
            state[key] = initState[key];
        }
    });
}

/**
 * 清除指定或者全部的modules的state
 * @param {Array} modules 参数可以是数组，包含了要重置的模块名称(例['user','audio']等)，不传则清空全部
 * @returns
 */
export function clearStore(modules) {
    if (!store) return;
    // 现有模块的名称
    const modulesKeys = Object.keys(store._modules.root._children);
    // 现有mutation的全部名称，里面包含了能执行CLEAR_XXX_STATE的mutation
    const mutationKeys = Object.keys(store._mutations);
    if (modules) {
        // 如果有传入modules，则执行了指定的模块进行清空state
        modules.forEach((module) => {
            const mutation = "CLEAR_" + module.toUpperCase() + "_STATE";
            if (modulesKeys.includes(module) && mutationKeys.includes(mutation)) {
                // 必须满足传入的module是在store的模块中的，同时要具有CLEAR_XXX_STATE的mutation才能清除
                store.commit(mutation);
            }
        });
    } else {
        // 如果没有传modules，则清除所有的模块的state
        modulesKeys.forEach((module) => {
            const mutation = "CLEAR_" + module.toUpperCase() + "_STATE";
            if (mutationKeys.includes(mutation)) {
                store.commit(mutation);
            }
        });
    }
}