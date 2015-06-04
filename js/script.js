// the tree object
var Tree = (function () {

	var loading = false,
		basePath = '',
		timeout;

	// show error message on laoding error
	function showError () {
		loading = false;
		$('.loader').slideUp();
		$('.page-error').slideDown();		
	}
	// hide error message 
	function hideError () {		
		$('.page-error').slideUp();	
		clearTimeout(timeout);	
	}
	
	// callback function for ajax
	function listTree(tree) {

		var container = $('#tree-container'),
			textInput = $('<textarea>'); // holder for the text to be copied	

		// recursive function to list a single directory and its contents
		function listDir(obj) {
			
			var collapseId = Date.now(),
				div = $('<div>',{class:'container-fluid'}),
				titleBlock = $('<div>',{class:'row title-block'}).appendTo(div),
					titleGroup = $('<p>').appendTo(titleBlock),
						fIcon = $('<i>',{class:'fa fa-folder collapse-toggle','data-target':'#'+collapseId,'title':'click to expand/collapse'}).appendTo(titleGroup),
						titleSpan = $('<span>',{class:'title-text'}).html('&nbsp;'+obj.name).appendTo(titleGroup),
						// copySpan = $('<span>',{class:'btn btn-primary'}).text('Copy Path').appendTo(titleGroup),
						pathSpan = $('<span>',{class:'text-primary path-text'}).text(obj.path).appendTo(titleGroup),
				contentBlock = $('<div>',{class:'row collapse',id:collapseId}).appendTo(div),
					ul = $('<ul>').appendTo(contentBlock);
			
			// list each content
			obj.contents.forEach(function (item,i) {
				var li = $('<li>').appendTo(ul);
				
				if ( item.contents )
				{
					li.append(listDir(item));
				}
				else
				{
					li
						.append($('<i>',{class:'fa fa-file-o'}))
						.append($('<span>').html('&nbsp;'+item.name));
				}
			});

			// // event handler for collapse toggle
			fIcon.add(titleSpan).on('click', function () {		  	
			  	contentBlock.collapse('toggle');
			  	// fIcon.toggleClass('fa-folder-open');
			});
			contentBlock
				.on('shown.bs.collapse',function (e) {
					fIcon.addClass('fa-folder-open');
					e.stopPropagation();
				})
				.on('hidden.bs.collapse',function (e) {
					fIcon.removeClass('fa-folder-open');
					e.stopPropagation();
				})


			return div;			

		}


		container.empty().append(listDir(tree));

	}


	// callback function after successful search
	function renderResult(searchText,result) {	

		// empty resultListContainer first
		$('#resultListContainer').toggle(false);
		$('#resultList').empty();
		
		// if no result
		if (result.length == 0) {

			$('#searchResult .panel-danger').toggle(true);

		}
		else
		{
			var listContainer = $('#resultListContainer'),
				ul = $('#resultList');

			// render each result item
			result.forEach(function (item) {

				// wrap the matched string in a span
				var text = item.name.replace(new RegExp(searchText,'gi'),function (x) {				
								return '<span class="text-success">'+x+'</span>';
							});
				
				ul.append('<li>'+text+'<br> &nbsp; <small class="text-muted">'+item.path+'</small></li>');

			});

			$('#resultListContainer .panel-heading').text(result.length+' match(es) found.')
			$('#resultListContainer').toggle(true);
			$('#searchResult .panel-danger').toggle(false);
			
		}

		$('#searchResult').slideDown();

	}

	// function to render the tree
	function renderTree () {

		if ( !loading )
		{

			// get the base path value
			var val = $('#basePath').val().replace(/[\\\s]*$/,'');

			// if basePath is not empty
			if ( val != basePath ) {

				basePath = val;

				hideError();
				$('#searchResult').slideUp();

				// set timer
				timeout = setTimeout(function () {
								showError();								
							},30000);
				
				// get the folder structure
				$.ajax({
					url : 'ajax/get_tree.php',
					dataType : 'json',
					type: 'post',
					data : { basePath : basePath },
					beforeSend : function () {
						$('#tree-container').slideUp();
						$('.loader').slideDown();
						$('#searchBar').slideUp();
						$('.modal').modal('hide');						
						loading = true;
					},
					error : function () {
						showError();
					},
					success : function (res) {

						clearTimeout(timeout);
						$('.loader').slideUp();
						$('#searchBar').slideDown();

						// handle search
						$('#searchBtn').click(function () {
					
								var input = $('#searchInput'),
									searchString = input.val();

								if ( searchString )
								{
									// show spinner
									$('#searchBar .fa-spinner').show();
									// hide tree
									$('#tree-container').slideUp();

									// filter array
									var result = res.store.filter(function (item) {
										return !!~item.name.search(new RegExp(searchString,'gi'));
									});

									// render results in dom
									$('#searchBar .fa-spinner').hide();
									renderResult(searchString,result);
								}					

							});

						listTree(res.tree);

						$('#tree-container').slideDown();
						$('.collapse-toggle').eq(0).trigger('click');
						$('[data-toggle="tooltip"]').tooltip();

						loading = false;

					}
				});

			}

		}

	}

	return {
		render : renderTree
	};
})();


$(document).ready(function () {	

	// handle back button
	$('#backBtn').click(function () {
		$('#searchResult').slideUp();
		$('#tree-container').slideDown();
	});

	// handle basePathUpdate
	$('#basePathUpdate').click(function () {
		Tree.render();
	}).trigger('click');

	// initialise Bootstrap tooltip
	$('[data-toggle="tooltip"]').tooltip();


})

