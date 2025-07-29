<template>
  <page-containe>
    <a-card>
      <a-tabs v-model:activeKey="activeKey" tab-position="left"  animated>
        <a-tab-pane key="1" tab="个人信息" class="personal-info">
          <a-card>
            <a-form :model="form" :label-col="{style: { width: '80px',textAlign:'left' }}" :wrapper-col="{ span: 6 }">
            <a-form-item label="头像">
              <div class="avatar">
                <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="头像">
                <a-upload multiple="false">
                    <div class="up-avator">
                      <p><CloudUploadOutlined /></p>
                      <p>设置头像</p>
                      </div>
                </a-upload>
              </div>
            </a-form-item>
            <a-form-item label="昵称">
              <a-input v-model:value = form.nickname></a-input>
            </a-form-item>
          
            <a-form-item label="部门">{{ form.dep }}</a-form-item>
            <a-form-item label="所属身份">{{ form.identity }}</a-form-item>
            <a-form-item label="性别">
              <a-radio-group v-model:value="form.gender">
                <a-radio value="1">男</a-radio>
                <a-radio value="2">女</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input  v-model:value="form.eMail" type="mail"></a-input>
            </a-form-item>
          </a-form>
          <div class="btn-group">
            <a-space>
              <a-button size="large">取消</a-button>
              <a-button type="primary" size="large">确定</a-button>
            </a-space>
          </div>
          
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="账号设置" class="account-set">
          <a-card>
            <a-form :model="accountForm" :label-col="{style: { width: '80px',textAlign:'left' }}" :wrapper-col="{ span: 6 }">
                <a-form-item label="手机号">
                  <a-input-group compact>
                    <a-input :value="accountForm.phone" style="width: calc(100% - 120px);" readonly></a-input>
                    <a-button type="default" @click="dialog.editPhone.open=true">更改</a-button>
                  </a-input-group>
                </a-form-item>
                <a-form-item label="密码">
                  <a-input-group compact>
                    <a-input :value="accountForm.pwd" style="width: calc(100% - 120px);" readonly type="password"></a-input>
                    <a-button type="default" @click="dialog.editPwd.open=true">更改</a-button>
                  </a-input-group>
                </a-form-item>
            </a-form>
            <a-modal :open="dialog.editPhone.open" @ok="dialog.editPhone.ok" @cancel="dialog.editPhone.cancel" title="修改手机号码" width="400px">
               <a-form :model="phoneForm">
                <a-form-item label="录入新手机号">
                  <a-input v-model:value="phoneForm.phone"></a-input>
                </a-form-item>
               </a-form>
            </a-modal>
            <a-modal :open="dialog.editPwd.open" @ok="dialog.editPwd.ok" @cancel="dialog.editPwd.cancel" title="修改密码" width="400px">
               <a-form :model="pwdForm">
                <a-form-item label="原密码">
                  <a-input v-model:value="phoneForm.oldPwd"></a-input>
                </a-form-item>
                <a-form-item label="新密码">
                  <a-input v-model:value="phoneForm.newPwd"></a-input>
                </a-form-item>
               </a-form>
            </a-modal>
          </a-card>
        </a-tab-pane>
      </a-tabs>    
    </a-card>
  
  </page-containe>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

  const activeKey = ref('1')
  const form = reactive({
    nickname: 'zhangsan',
    dep: '服诺/推广部/推广一部',
    identity: '推广专员',
    gender: 1,
    eMail: ''
  })
  const accountForm = reactive({
    phone: '15888888888',
    pwd: '12345678'
  })
  const phoneForm =reactive({
    phone: ''
  })
  const pwdForm = reactive({
    oldPwd: '',
    newPwd: ''
  })
  const dialog = reactive({
    editPhone: {
      open: false,
      ok:()=>{
        dialog.editPhone.open = false
      },
      cancel: ()=>{
        dialog.editPhone.open = false
      }
    },
    editPwd: {
      open: false,
      ok:()=>{
        dialog.editPwd.open = false
      },
      cancel: ()=>{
        dialog.editPwd.open = false
      }
    }
  })


  const adavatarList = [
    {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  ]
</script>

<style lang="less" scoped>
.personal-info,.account-set{
  .ant-card{
    min-height: 600px;
    padding: 40px 0;
  }
}
  .avatar{
    width: 110px;
    height: 110px;
    position: relative;
    img{
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .up-avator{
      text-align: center;
      width: 110px;
      height: 110px;
      border-radius: 5px;
      background: rgba(0, 0, 0, .3);
      position: absolute;
      top: 0;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      p{
        padding: 0;
        margin: 0;
      }
    :deep(.anticon-cloud-upload){
      padding-top: 20px;
      svg{
        width: 40px !important;
        font-size: 30px;
      }
    }
    }
  }
  :deep(.btn-group){
    text-align: center;
    margin-top: 40px;
    .ant-btn{
      width: 110px;
      margin: 0 15px;
    }
  }
</style>