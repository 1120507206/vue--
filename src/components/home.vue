<template>
	
	<el-container class="home-container">
		<!-- 头部区域 -->
	  <el-header>
	  <div>
		   <img src="../assets/heima.png" />
		  <span>后台管理系统</span>
	  </div>
	  <el-button type="success" @click = "loginout">退出</el-button>
	  
	  </el-header>
	  <!-- 页面主图区域 -->
	  <el-container>
		  <!-- 侧边栏 -->
	    <el-aside :width="issubItem ? '64px' :'240px'">
			<div class="toggle-button" @click="togglebuten">|||</div>
		
		<el-menu
		      default-active="2"
		      class="el-menu-vertical-demo"
		    
		      background-color="#545c64"
		      text-color="#fff"
		      active-text-color="#ffd04b"
			  unique-opened
			  :collapse = issubItem
			  router
			 :collapse-transition = "false"
			  > <!-- 控制菜单只能出现一次 -->
			   <!-- 一级菜单 -->
			   
		      <el-submenu  :index="item.id +''" v-for="item in menulist" :key="item.id">
				  <!-- template为菜单模板区 -->
		        <template slot="title">
		          <i :class="IconFont[item.id]"></i>
		          <span class="sub-title">{{item.authName}}</span>
		        </template>
				
				
		       <!-- 这是二级菜单 -->
		     <el-menu-item :index="'/' + subItem.path+''" v-for="subItem in item.children" :key="subItem.id">
			 
			 <template slot="title">
			   <i class="el-icon-menu"></i>
			   <span class="sub-title2">{{subItem.authName}}</span>
			 </template>
			 
			 </el-menu-item>
		       
		      </el-submenu>
			
		     
		    </el-menu>
		
		</el-aside>
		<!-- 右侧内容主体 -->
	    <el-main>
		<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
	
</template>

<script>
	export default{
		data() {
			return {
				menulist: [],
				IconFont:{
					'125':'iconfont icon-user',
					'103':'iconfont icon-tijikongjian',
					'101':'iconfont icon-shangpin',
					'102':'iconfont icon-danju',
					'145':'iconfont icon-baobiao',
					
					
				},
				issubItem:false
				
				
			}
		},
	created() {
		this.getMenuList()
	},
	methods:{
		loginout() {
			window.sessionStorage.clear()//清除token
			this.$router.push("/login")//重定向
		},
	   async	getMenuList(){
		const {data:res} = await	this.$http.get('menus')
		if(res.meta.status !==200) return this.$message.error(res.meta.msg)
		this.menulist = res.data
		this.children = res.data.children
		
		console.log(res.data)
		
		
		},
		togglebuten(){
			this.issubItem = !this.issubItem
			
		}
	}
	};
</script>

<style lang="less" scoped="scoped">
	.home-container{
		height: 100%;
	}
	 .el-header, .el-footer {
	    background-color: #B3C0D1;
	    color: #333;
	    text-align: center;
	    
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		font-size: 20px;
		>div{
			display: flex;
			align-items: center;
			span{
				margin-left: 15px;
				text-shadow: 5px 5px 5px #FF0000;
			}
		}
	  }
	  
	  .el-aside {
		 margin-left:-10px ;
	    background-color: #D3DCE6;
	    color: #333;
	    text-align: center;
	    line-height: 200px;
		font-size: 22px;
		.el-menu{
			border-right: none;
		}
	  }
	 
	  
	  .el-main {
	    background-color: #E9EEF3;
	    color: #333;
	    text-align: center;
	    line-height: 160px;
	  }
	  .sub-title{
		  font-size: 18px;
	  }
	  .sub-title2{
	  		  font-size: 16px;
	  }
	  
	.iconfont{
		margin-right: 10px;
	}
	.toggle-button{
		background-color:#545C64 ;
		font-size: 10px;
		text-align: center;
		line-height: 20px;
		color: white;
		letter-spacing: 0.2em;
		cursor: pointer;
	}
</style>
