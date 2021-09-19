<?php
session_start();

$usuario = $_POST['usuario'];
$senha = $_POST['senha'];

if (!empty($usuario)) {

	$api_acl = getenv("URL_API_ACL");
	$post_login = "$api_acl/api/login";


	$body = '{ "username": "' . $usuario . '", "password": "' . $senha .'" }';
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $post_login);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json", "Authorization: OAuth 2.0 token here"));
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
	$result = curl_exec($ch);
	$retorno = json_decode($result);
	
	

	if (!empty($retorno->token)) {
		$_SESSION['ms_admin_usuario'] = $retorno->token;
		print "<script> document.location.href ='index.php';  </script>";
	}
	else {
		print "<script> alert('Usuário ou senha invalido!') </script>";
	}

}
?>

<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Buiatti | Painel de Controle</title>
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<!-- Bootstrap 3.3.6 -->
	<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="dist/css/AdminLTE.min.css">
	<!-- iCheck -->
	<link rel="stylesheet" href="plugins/iCheck/square/blue.css">

	<script src="node_modules/angular/angular.js?v=<?= time() ?>"></script>
	<script src="node_modules/angular/angular-locale_pt-br.js"></script>
	<script src="scripts/app.js?v=<?= time() ?>"></script>
	<script src="scripts/controllers/LoginCtrl.js?v=<?= time() ?>"></script>

	<script src='dist/js/textAngular-rangy.min.js'></script>
	<script src='dist/js/textAngular-sanitize.min.js'></script>
	<script src='dist/js/textAngular.min.js'></script>

	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

</head>

<body class="hold-transition login-page" ng-app="admin" ng-controller="LoginCtrl">
	<div class="login-box">
		<div class="login-logo">
			Acesso Restrito {{teste}}
		</div>
		<!-- /.login-logo -->
		<div class="login-box-body">
			<p class="login-box-msg">Entre com seu usuário</p>

			<form action="login.php" method="post">
				<input type=hidden name=login value=1>
				<div class="form-group has-feedback">
					<input type="text" class="form-control" placeholder="Usuário" name="usuario" id="usuario">
					<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" class="form-control" placeholder="Senha" name=senha>
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div class="row">
					<div class="col-xs-8">
						<div class="checkbox icheck">
							<label>
							</label>
						</div>
					</div>
					<!-- /.col -->
					<div class="col-xs-4">
						<button type="submit" class="btn btn-primary btn-block btn-flat">Entrar</button>
					</div>
					<!-- /.col -->
				</div>
			</form>



		</div>
		<!-- /.login-box-body -->
	</div>
	<!-- /.login-box -->

	<!-- jQuery 2.2.3 -->
	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<!-- iCheck -->
	<script src="plugins/iCheck/icheck.min.js"></script>
	<script>
		$(function() {
			$('input').iCheck({
				checkboxClass: 'icheckbox_square-blue',
				radioClass: 'iradio_square-blue',
				increaseArea: '20%' // optional
			});

			$("#usuario").focus();


		});
	</script>
</body>

</html>