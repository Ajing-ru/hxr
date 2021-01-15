<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/menu">菜单管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <el-button @click="$router.push('/menu/add')">添加</el-button>
        <el-table :data="arr">
            <el-table-column label="编号" prop="id" width="50"></el-table-column>
            <el-table-column label="菜单名称" prop="title"  width="80"></el-table-column>
            <el-table-column label="菜单类型">
                <template slot-scope="item">
                    <el-tag v-if="item.row.type == 1">目录</el-tag>
                    <el-tag v-else>菜单</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="菜单图标" prop="icon"></el-table-column>
            <el-table-column label="菜单地址" prop="url"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status == 1">启用</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
            </el-table-column>
             <el-table-column label="操作"  width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="$router.push('/menu/'+scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            arr:[]
        }
    },
    mounted(){
        axios.get('/api/menulist').then(res=>{
            this.arr = res.data.list;
        })
    },
    methods:{
        //删除菜单
        del(obj){
                this.$confirm('此操作永久删除该菜单，是否删除','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    axios.post('/api/menudelete',{id:obj.row.id}).then(res=>{
                        if(res.data.code===200){
                            this.arr=res.data.list
                            this.$message({
                                type:'success',
                                message:'删除成功'
                            });
                    }else{
                        this.$message({
                            type: 'info',
                            message: res.data.msg
                        });          
                    }
                })
            }).catch(()=>{})
        }
    }
}
</script>

<style>

</style>