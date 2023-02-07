import Vue from "vue";

/**
 * 获取select option选项，其功能是将数据响应式更新，使得select有动态数据
 * @param {*} apiFn 获取数据的函数接口
 * @param {*} formItems 可以响应式修改的对象数组
 * @param {*} field 匹配的字段
 */
export function setSelectOption(apiFn, config, field) {
    apiFn().then((res) => {
        const fieldIndex = config.formItems.findIndex((item) => {
            return item.field === field;
        });
        res.forEach((option, index) => {
            Vue.set(config.formItems[fieldIndex].options, index, option);
        });
    });
}