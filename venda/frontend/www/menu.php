<?php
$api_acl = getenv("URL_API_ACL");
$api_url = "$api_acl/api/menu";
$json_data = file_get_contents($api_url);
$lista_menu = json_decode($json_data);
?>

<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">

	<div style="color: #ececec;text-align: center;position: absolute;bottom: 10px;width: 100%;"> ms-venda-frontend v1.0</div>
	
	<!-- sidebar: style can be found in sidebar.less -->
	<section class="sidebar">
		<!-- Sidebar user panel -->
		<div class="user-panel">
			<div class="pull-left image">
				<img src="{{teste}}/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
			</div>
			<div class="pull-left info">
				<p>GB Admin </p>
				<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
			</div>
		</div>
		<!-- search form -->
		<form action="#" method="get" class="sidebar-form">
			<div class="input-group">
				<input type="text" name="q" class="form-control" placeholder="Procurar">
				<span class="input-group-btn">
					<a name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></a>
					</button>
				</span>
			</div>
		</form>
		<!-- /.search form -->
		<!-- sidebar menu: : style can be found in sidebar.less -->
		<ul class="sidebar-menu">
			<li class="header">MENU</li>
			<?php
			foreach ($lista_menu as $menu) {
				echo "<li id='menucliente'><a href='$menu->url'><i class='fa fa-book'></i> <span>$menu->descricao</span></a></li>";
			}
			?>
		</ul>
	</section>
	<!-- /.sidebar -->
</aside>