<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }">菜单管理</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/menu/add">菜单{{tip}}页</a></el-breadcrumb-item>
        </el-breadcrumb>
          <!-- 
            el-form 表单验证
                model 要验证的数据
                rules 验证规则
                ref 可以通过dom操作来实现调用组件的属性和方法
         -->
        <el-form style="width:400px;" label-width="80px" :model="info" :rules="rules" ref="menuform">
            <el-form-item label="上级菜单" prop="pid">
                <el-select v-model="info.pid" @change="pidChange">
                    <el-option label="顶级菜单" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" prop="title">
                <el-input placeholder="请输入菜单名称" v-model="info.title" ></el-input>
            </el-form-item>
            <el-form-item label="菜单类型" prop="type">
                <el-radio-group v-model="info.type">
                    <!-- 加冒号进行属性绑定,把字符串变成整数，与data中的type数据类型对应 -->
                    <el-radio :label="1">目录</el-radio>
                    <el-radio :label="2">菜单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单图标" v-show="info.type==1" prop="icon">
                <el-input placeholder="请输入菜单图标" v-model="info.icon"></el-input>
            </el-form-item>
            <el-form-item label="菜单地址" v-show="info.type==2" prop="url">
                <el-input placeholder="请输入菜单地址" v-model="info.url"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                 <el-switch placeholder="请输入菜单状态" v-model="info.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            tip:'添加',
            info:{
                pid:'',
                title:'',
                type:1,
                icon:'',
                url:'',
                status:1
            },
             rules:{
                pid:[
                    { required: true, message: '请选择上级菜单', trigger: 'blur' },
                ],
                title:[
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    {min:3,max:20,message: '请输入3~20之间的字符', trigger: 'blur'}
                ],
                // type:[
                //     { required: true, message: '请选择菜单类型', trigger: 'blur' },
                // ],
                // icon:[
                //     { required: true, message: '请选择菜单图标', trigger: 'blur' },
                // ],
                // url:[
                //     { required: true, message: '请输入菜单地址', trigger: 'blur' },
                // ],
                // status:[
                //     { required: true, message: '请选择菜单状态', trigger: 'blur' },
                // ],
            },
            menuarr:[]
        }
    },
   
    methods:{
        submit(){
          this.$refs['menuform'].validate((valid)=>{
              if(valid){
                  //调用接口，完成数据的添加操作
                  var url='/api/menuadd'
                  if(this.$route.params.id){
                      url='/api/menuedit'
                      this.info.id=this.$route.params.id
                  }
                 axios.post(url,this.info).then(res=>{
                    //给出提示或者跳转页面
                  if(res.data.code==200){
                        this.$router.push('/menu')
                  }
                 })
              }
          });
        },
        pidChange(n){
            this.info.type=n==0?1:2;
        }
    },
    //菜单信息页面组件挂在完成后，请求接口，获取上级菜单选项数据
    mounted() {
        
            if(this.$route.params.id){
                this.tip="编辑"
                axios.get('/api/menuinfo',{
                    params:{id:this.$route.params.id} }).then(res=>{
                        this.info=res.data.list
                })
            }
            axios.get('/api/menulist?pid=0').then(res=>{
                this.menuarr=res.data.list
            })
        }
    }
</script>
<style scoped>


</style>