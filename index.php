<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Work Files</title>	
	<link rel="stylesheet" href="libs/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="libs/font-awesome/css/font-awesome.css">
	<link rel="stylesheet" href="css/style.css">
	<script src="libs/jquery.js"></script>	
	<script src="libs/zClip/zclip.min.js"></script>	
	<script src="libs/bootstrap/js/bootstrap.min.js"></script>
	<script src="js/script.js"></script>
</head>
<body>
	<div class="container-fluid">

		<div class="panel panel-default">


			<div class="panel-heading">
				<div class="row">
					<div class="col-xs-8">
						<h3>Work Files Tree <span class="btn btn-default text-muted" data-toggle="modal" data-target="#settingModal"><i class="fa fa-gear" data-toggle="tooltip" data-placement="bottom" title="settings"></i></span></h3>
					</div>
					<div class="col-xs-4">
						<div class="collapse" id="searchBar">
							<i class="fa fa-spinner fa-pulse fa-2x pull-left text-muted"></i>					
							<div class="input-group">												
								<input class="form-control" id="searchInput" type="text" placeholder="Search...">
								<div class="btn btn-default input-group-addon" id="searchBtn">
									<i class="fa fa-search"></i>
								</div>
							</div>					
						</div>
					</div>
				</div>
				<!-- end row -->				
			</div>
			<!-- close panel heading -->


			<div class="panel-body">


				<div class="loader">
					<h4>
						<span class="text-muted"><i class="fa fa-spinner fa-pulse fa-lg	"></i>&nbsp;Loading...</span>
					</h4>
				</div>
				<!-- close loader -->


				<div class="collapse text-danger page-error panel pnel-danger">
					<p>Unable to load data. It is either the page takes too long to load or an error has occured.</p>
					<p>Please <a href="#" onclick="window.location.reload()">reload</a> this page or update your base path in Settings.</p>
				</div>
				<!-- close notification box -->


				<div id="tree-container">
					<!-- file tree goes here -->
				</div>
				<!-- close file tree -->


				<div class="collapse clearfix" id="searchResult">

					<div class="clearfix">
						<div class="pull-right">
							<a href="#" id="backBtn">Back</a>	
						</div>
					</div>
					
					<div class="collapse panel panel-danger text-danger">
						<div class="panel-body">
							No result found.
						</div>
					</div>

					<div id="resultListContainer">
						<div class="panel panel-primary">
							<div class="panel-heading">								
							</div>
							<div class="panel-body">
								<ul id="resultList"></ul>
							</div>
						</div>
						<!-- search result list goes here -->
					</div>					

				</div>
				<!-- close search result -->


			</div>
			<!-- close panel-body -->

		</div>
		<!-- close panel -->

	</div>
	<!-- close container-fluid -->

	<div class="modal fade" id="settingModal">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<div class="btn fa fa-close pull-right text-muted" data-dismiss="modal"></div>
					<h3>Settings</h3>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="#basePath">
							Base path:
						</label>
						<div class="input-group">
							<input type="text" class="form-control" id="basePath" value="E:\WORK_FILES">
							<div class="input-group-addon btn btn-default" id="basePathUpdate">
								Update
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>