<template>
	<div>
		<!-- 导航栏 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		  
		</el-breadcrumb>
		<el-card class="box-card">
		  <el-row :gutter="5"  class="input-user">
			  <el-col :span="5">
				  <div >
				    <el-input placeholder="请输入内容" clearable  v-model="queryInfo.query" >
				     
				      <el-button slot="append" icon="el-icon-search" @click = "getUserList"></el-button>
				    </el-input>
				  </div>
			  </el-col>
			  <el-col :span="5">
				  <el-button type="primary"  @click="dialogVisible = true">添加用户</el-button>
			  </el-col>
		  </el-row>
		  
		  <!-- 用户区域 -->
		  <el-table
		  :data="userslist" border >
		  <el-table-column  type="index"></el-table-column>
			<el-table-column 
			label="姓名"
			prop="username" 
			></el-table-column>  
			
			<el-table-column
			label="邮箱"
			prop="email"
			></el-table-column>  
			
			<el-table-column
						label="电话"
						prop="mobile"
						></el-table-column>  
			  
		 
		  <el-table-column
		  			label="角色"
		  			prop="role_name"
		  			></el-table-column>  
		<el-table-column
					label="状态"
					prop="mg_state"
					>
					<template slot-scope="scope">
						
						<el-switch v-model="scope.row.mg_state"></el-switch>
					</template>
					</el-table-column> 
		<el-table-column
					label="操作" width="200px" >
					<template >
						
						<el-tooltip  effect="dark" content="修改" placement="top">
						     <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
						   </el-tooltip>
						<el-tooltip  effect="dark" content="删除" placement="top">
						     <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
						   </el-tooltip>
						 <el-tooltip  effect="dark" content="分配角色" placement="top">
						      <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
						    </el-tooltip>
					</template>
					</el-table-column> 						
		  			  
		  </el-table>
		  <!-- 分页功能 -->
		      <el-pagination 
		        @size-change="handleSizeChange"
		        @current-change="handleCurrentChange"
		        :current-page="queryInfo.pagenum"
		        :page-sizes="[1, 2, 5, 10]"
		        :page-size="queryInfo.pagesize"
		        layout="total, sizes, prev, pager, next, jumper"
		        :total="20">
		      </el-pagination>
		</el-card>
		<!-- 添加用户弹出框 -->
		<el-dialog
		  title="添加用户"
		  :visible.sync="dialogVisible"
		  width="40%" 
		  @close = "addDialogClosed"
		 >
		 <!-- 表单验证 -->
		<el-form :model="addForm" :rules="rules" label-position="left" ref="addForm" label-width="80px"  >
		  <el-form-item label="用户名" prop="username">
		    <el-input v-model="addForm.username"></el-input>
			</el-form-item>
		<el-form-item label="密码" prop="password">
		  <el-input v-model="addForm.password" type="password"></el-input>
					</el-form-item>
		<el-form-item label="手机" prop="phone">
		  <el-input v-model="addForm.phone"></el-input>
					</el-form-item>	
		<el-form-item label="邮箱" prop="email">
		  <el-input v-model="addForm.email"></el-input>
					</el-form-item>						
		</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false" >取 消</el-button>
		    <el-button type="primary" @click="addUser">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				queryInfo:{
					query:'',
					pagenum:1,
					pagesize:2
				},
				userslist:[],
				total:0,
				dialogVisible:false,
				addForm:{
					username:'',
					password:'',
					phone:'',
					email:''
					
					
				},
				// 验证规则
				rules:{
					username: [
					            { required: true, message: '请输入用户名', trigger: 'blur' },
					            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					          ],
					password: [
					            { required: true, message: '请输入密码', trigger: 'blur' },
					            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					          ],		
					phone: [
					           
					          ],
					email: [
					            
					          ],					  
				}
			}
		},
		created() {
			this.getUserList()
		},
		methods:{
		async getUserList(){
		const {data:res} = await this.$http.get('users',
		{params:this.queryInfo,
		})
		if(res.meta.status !==200){
			return this.$message.error('获取用户列表失败')
		}
		this.userslist = res.data.users
		this.total = res.data.total
		console.log(res.data)
		},
		// 这是分页中选择条数的
		handleSizeChange(newSize){
			this.queryInfo.pagesize = newSize
			console.log(newSize)
			this.getUserList()
		},
		// 这是选择页码，当页码发生改变时重新请求数据并赋值
		handleCurrentChange(newPage){
			this.queryInfo.pagenum = newPage
			this.getUserList()
		},
		// 表单关闭是重置
		addDialogClosed(){
			this.$refs.addForm.resetFields()
			console.log('1')
		},
		// 点击按钮，添加用户
		 addUser(){
			this.$refs.addForm.validate( async valid =>{
				if(!valid) return
				const {data:res} = await this.$http.post('users',this.addForm)
				if(res.meta.status!== 201){
					this.$message.error('添加失败')
				}
				this.$message.success('添加成功')
				this.dialogVisible = false
				this.getUserList()
			} )
		}
		
		
		
	}
}
</script>

<style lang="less" scoped="scoped">
	.box-card{
		margin-top: 10px;
	
	}
	.el-dialog{
		
	}
	.el-main{
		line-height: 50px;
		text-align: left;
	}
	.el-pagination {
		text-align: left;
	}
	
	
</style>
