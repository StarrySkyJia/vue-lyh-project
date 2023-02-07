// 为view页面search组件提供函数，该函数会触发content组件去获取页面数据
export function usePageSearch(RefInstance) {
    const resetBtnClick = (queryInfo) => {
        RefInstance.getPageTableList(queryInfo);
    };
    const queryBtnClick = (queryInfo) => {
        RefInstance.getPageTableList(queryInfo);
    };

    return { resetBtnClick, queryBtnClick };
}