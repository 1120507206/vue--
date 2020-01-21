<template>
	<div class="login_conter">
		
		<div class="login_box">
			<!-- 头部区 -->
			<div class="avatar_box">
				<img src="../assets/logo.png" />
			</div>
			<!-- 表单区 -->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginRule" label-width="80px" class="login_from">
			  <el-form-item prop="username" label="账号">
			    <el-input  v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
			  </el-form-item>
			  
			  <el-form-item prop="password" label="密码">
			    <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-lock_fill"></el-input>
			  </el-form-item>
			  <!-- 按钮区域 -->
			  
			  <el-form-item class="btns">
				   <el-button type="primary" @click="login">登录</el-button>
				    <el-button type="infor" @click="resLoninFrom">重置</el-button>
			  </el-form-item>
			  </el-form>
			  
		</div>
	
	</div>
	
</template>

<script>
	export default {
		data(){
			return{
				loginForm:{
					username:'admin',
					password:'123456',
					
				},
				loginRule:{
					 username: [
					            { required: true, message: '账号不要忘记哦', trigger: 'blur' },
					           
					          ],
					password:[
						{ required: true, message: '密码不要忘记哦', trigger: 'blur' },
						
					]		  
				}
				
			};
			
		},
		methods:{
			// 点击重置按钮,重置按钮
			resLoninFrom(){
				this.$refs.loginFormRef.resetFields();
			},
			login(){
				this.$refs.loginFormRef.validate(async valid=>{
					console.log(valid);
					if (!valid) return;
					
					const {data:res} =await this.$http.post("login",this.loginForm)
					if(res.meta.status !== 200) return this.$message.error("登录失败");
					this.$message.success("登录成功");
					console.log(res)
					window.sessionStorage.setItem("token",res.data.token);
					this.$router.push("/home");
				})
			}
		}
	};
	
</script>

<style lang="less" scoped>
	.login_conter{
		background-color:#2b4b6b ;
		height: 100%;
		
	}
	.login_box{
		width: 450px;
		height: 300px;
		border-radius: 3px;
		background-color: #fff;
		position: absolute;
		
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		
		.avatar_box{
			height: 130px;
			width: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px;
			position: absolute;
			left: 50%;
			transform: translate(-50%,-50%);
			background-color: #42B983;
			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}
	.btns{
		display: flex;
		justify-content: flex-end;
	}
	.login_from{
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}
</style>
