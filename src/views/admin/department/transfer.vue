<template>
  <div class="transfer">
    <el-transfer
      style="text-align: left; display: inline-block"
      :data="usersrData"
      v-model="value"
      filterable
      :titles="['所有用户', '部门成员']"
      :button-texts="['移除成员', '添加成员']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
    >
      <template slot="right-footer">
        <div class="comfirm-btn">
          <el-button size="small" type="primary" @click="handleComfirm"
            >确定修改</el-button
          >
        </div>
      </template>
    </el-transfer>
  </div>
</template>

<script>
import {
  getDeptMemberList,
  addDeptMember,
  removeDeptMember,
} from "@/api/admin/department";
import { getUserList } from "@/api/admin/user";
export default {
  props: {
    deptId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      // 所有用户数据
      usersrData: [],
      //   更改后的数据
      value: [],
      //   原始数据
      orgValue: [],
    };
  },
  watch: {
    // 由于组件不卸载，所以监听deptID的更新就行了
    deptId(newVal) {
      this.value = [];
      this.getUserListFn(newVal);
    },
  },
  mounted() {
    // 获取当前部门成员列表
    this.getUserListFn(this.deptId);
    // 获取所有用户列表
    getUserList({ pageNum: 0, pageSize: 99 }).then((res) => {
      res.users.forEach((user) => {
        this.usersrData.push({ key: user.userId, label: user.realName });
      });
    });
  },
  methods: {
    // 确认修改
    handleComfirm() {
      const addData = this.value.filter((id) => {
        return this.orgValue.indexOf(id) === -1;
      });

      const removeData = this.orgValue.filter((id) => {
        return this.value.indexOf(id) === -1;
      });

      if (addData.length !== 0) {
        addDeptMember({ deptId: this.deptId, memberSets: addData });
      }
      if (removeData.length !== 0) {
        removeDeptMember({ deptId: this.deptId, memberSets: removeData });
      }
    },

    // 获取当前部门成员列表
    getUserListFn(id) {
      const data = {
        departmentId: id,
        pageNum: 0,
        pageSize: 99,
      };
      getDeptMemberList(data).then((res) => {
        res.forEach((item) => {
          this.value.push(item.userId);
          this.orgValue.push(item.userId);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer,
.comfirm-btn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
