<?php


		
	$basepath = $_POST['basePath'];

	$data_store = array(); // linear holder for all the data

	// recursive function to scan each directories and subdirectories
	function scan_dir($path)
	{
		global $data_store;
		$dir = scandir($path);
		$tree = array(
				'name' => utf8_encode(array_slice(explode('\\', $path), -1)[0]),
				'path' => utf8_encode($path),
				'type' => 'directory',
				'contents' => array()
			);
		

		// temporary containers for each content type
		$dirs = [];
		$files = [];


		foreach ($dir as $key => $d) {

			// exclude "." and ".."
			if ( $d != "." && $d != ".." )
			{
				
				// add to the data store
				$data_store[] = array(
					'name' => utf8_encode($d),
					'path' => utf8_encode($path.'\\'.$d)
				);

				// if directory, perform recursive function
				if ( is_dir($path.'\\'.$d) )
				{
					$dirs[] = scan_dir($path.'\\'.$d);
				}
				else
				{
					$files[] = array(
						'name' => utf8_encode($d),
						'path' => utf8_encode($path.'\\'.$d),
						'type' => 'file'
					);					
				}	

				// sort according to type
				$tree['contents'] = array_merge($dirs,$files);
			}				
		}

		return $tree;
	}

	$file_tree = array(
			'tree' => scan_dir($basepath),
			'store' => $data_store
		);
	
	$json = json_encode($file_tree);
	
	echo $json;

?>