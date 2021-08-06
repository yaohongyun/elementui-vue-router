<template>
  <div v-loading="disabled">
    <h3>login</h3>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
      <el-form-item prop="username">
        <el-input v-model="dataForm.username" placeholder="帐号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="dataForm.password" type="password" placeholder="密码" />
      </el-form-item>
      <el-form-item prop="captcha">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-input v-model="dataForm.captcha" placeholder="验证码" />
          </el-col>
          <el-col :span="10" class="login-captcha">
            <img :src="captchaPath" @click="getCaptcha()" alt="" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn-submit" type="primary" :disabled="disabled" @click="dataFormSubmit()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUUID } from '@/utils'
export default {
  data() {
    return {
      dataForm: {
        username: "",
        password: "",
        uuid: "",
        captcha: "",
      },
      dataRule: {
        username: [
          { required: true, message: "帐号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
      captchaPath: "",
      disabled: false
    };
  },
  created() {
    this.getCaptcha()
  },
  mounted() {},
  methods: {
    // 提交表单
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if(valid){
          this.disabled = true
          this.$API.login(this.dataForm).then(({data}) => {
            if (data && data.code === 0){
              this.$cookie.set('token', data.token)
              this.$router.replace({ name: 'home' })
            }else {
              this.getCaptcha()
              this.$message.error(data.msg)
              this.dataForm.captcha = ''
              this.disabled = false
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    // 获取验证码
    getCaptcha() {
      this.dataForm.uuid = getUUID()
      this.captchaPath = `http://127.0.0.1:8080/renren-fast/captcha.jpg?uuid=${this.dataForm.uuid}`
    },
  },
};
</script>

<style>
</style>