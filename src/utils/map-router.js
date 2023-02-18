/**
 * 根据类型返回对应的路由数据，管理员/非管理员
 * @param {*} path
 * @returns
 */
export function mapFileToRoutes(path) {
    const allRoutes = [];

    if (path === "admin") {
        // 管理员路由
        const routeFiles = require.context("@/router/admin", true, /\.js/);
        routeFiles.keys().forEach((key) => {
            // 拼接完整路径
            const route = require("../router/admin" + key.split(".")[1]);
            allRoutes.push(route.default);
        });
    } else if (path === "main") {
        // 业务路由
        const routeFiles = require.context("@/router/main", true, /\.js/);
        routeFiles.keys().forEach((key) => {
            // 拼接完整路径
            const route = require("../router/main" + key.split(".")[1]);
            allRoutes.push(route.default);
        });
    } else if (path === "project") {
        //项目空间路由
        const routeFiles = require.context("@/router/project", true, /\.js/);
        routeFiles.keys().forEach((key) => {
            // 拼接完整路径
            const route = require("../router/project" + key.split(".")[1]);
            allRoutes.push(route.default);
        });
    }

    // 返回所有路由信息，结构为有children的路由对象
    return allRoutes;
}