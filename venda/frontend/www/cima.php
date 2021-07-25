<?php
session_start();

if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
	$_PROTOCOL = "https";
else
	$_PROTOCOL = "http";

$URL_BASE = $_PROTOCOL . "://" . $_SERVER['SERVER_NAME'] . ":" . $_SERVER['SERVER_PORT'];
if (!$_SESSION['ms_admin_usuario']) print "<script language='JavaScript'>location.href='" . $URL_BASE . "/login.php'</script>";
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
	<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css" />
	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
	<!-- DataTables -->
	<link rel="stylesheet" href="/plugins/datatables/dataTables.bootstrap.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="/dist/css/AdminLTE.css">
	<!-- AdminLTE Skins. Choose a skin from the css/skins
	folder instead of downloading all of them to reduce the load. -->
	<link rel="stylesheet" href="/dist/css/skins/_all-skins.min.css">
	<link rel="stylesheet" href="/dist/css/loader.css">

	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<base href="<?= $URL_BASE ?>">

	<script>
		var URL_API = "<?= getenv("URL_API") ?>"
		var URL_API_CONSULTA_CEP = "<?= getenv("URL_API_CONSULTA_CEP") ?>"
	</script>


	<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="bower_components/moment/min/moment.min.js"></script>
	<script type="text/javascript" src="bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"></script>
	<!-- DataTables -->
	<!-- SlimScroll -->
	<script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>
	<!-- FastClick -->
	<script src="plugins/fastclick/fastclick.js"></script>
	<!-- AdminLTE App -->
	<script src="dist/js/app.min.js"></script>
	<!-- AdminLTE for demo purposes -->
	<script src="dist/js/demo.js"></script>

	<script src="node_modules/angular/angular.js"></script>
	<script src="node_modules/angular/angular-locale_pt-br.js"></script>
	<script src="scripts/app.js"></script>
	<script src="scripts/jquery.maskMoney.min.js"></script>
	<script src="scripts/controllers/teste.js"></script>

	<script src="scripts/moment.min.js"></script>
	<script src="scripts/moment-with-locales.min.js"></script>

	<script src='dist/js/textAngular-rangy.min.js'></script>
	<script src='dist/js/textAngular-sanitize.min.js'></script>
	<script src='dist/js/textAngular.min.js'></script>


	<script src="plugins/input-mask/jquery.inputmask.js"></script>
	<script src="plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
	<script src="plugins/input-mask/jquery.inputmask.extensions.js"></script>

	<!-- page script -->
	<script>
		angular.element(document).ready(function() {
			$('body').css('display', 'block');
		});
	</script>

	<script type="text/javascript">
		$(function() {
			$('.date').datetimepicker({
				format: 'DD/MM/YYYY'
			});

			$(".moeda").maskMoney({
				decimal: ",",
				thousands: ".",
				allowZero: true
			});

			$(".moeda4").maskMoney({
				precision: 4,
				decimal: ",",
				thousands: ".",
				allowZero: true
			});


			$('[data-mask]').inputmask()

		});
	</script>

</head>


<body class="hold-transition skin-blue sidebar-mini" ng-app="admin" style="display:none">

	<script>
		var ID = '<?= $id ?>';
	</script>

	<div class="cobre" style="display: none;">
		<div id="container-loader">
			<div id="loader"></div>
		</div>
	</div>

	<div class="wrapper">

		<?php include("header.php") ?>

		<!-- Left side column. contains the logo and sidebar -->
		<?php include("menu.php") ?>