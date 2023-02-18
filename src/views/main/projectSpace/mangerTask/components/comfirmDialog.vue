<template>
  <!-- 发布任务确认 -->
  <el-dialog
    append-to-body
    title="是否发布任务？"
    :visible.sync="dialogFormVisible"
    class="dialoag"
  >
    <div class="content">
      <div style="font-size: 18px; margin-bottom: 10px">
        该任务会发布至任务大厅等待领取哦
      </div>
      <div style="color: #ccc">
        注：如果指定了任务领取人，那么该任务不会出现在任务大厅，而是直接指定到领取人的任务管理中哦
      </div>
    </div>
    <el-form size="mini" class="form">
      <el-row>
        <el-col :offset="12">
          <el-form-item label="任务指定人">
            <el-select
              v-model="receiveId"
              clearable
              filterable
              value-key="userId"
              placeholder="请选择任务指定人"
              @change="handleReceiveClick"
            >
              <el-option
                v-for="user in itemUserList"
                :key="user.userId"
                :label="user.realName"
                :value="user"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogFormVisible = false"
        >取 消</el-button
      >
      <el-button size="small" type="primary" @click="handlePublishClick"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { getProjUserList } from "@/api/project/project";

export default {
  data() {
    return {
      receiveId: null,
      itemUserList: [],
      dialogFormVisible: false,
    };
  },
  props: {
    itemId: {
      type: Number,
      require: true,
    },
  },
  mounted() {
    getProjUserList({
      itemId: this.itemId,
      pageNum: 0,
      pageSize: 10,
    }).then((res) => {
      this.itemUserList = res.userInfoVOList;
    });
  },
  methods: {
    handleReceiveClick(receiver) {
      this.$emit("select", receiver);
    },
    handlePublishClick() {
      this.$emit("comfirm");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialoag {
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
  }
}
</style>
