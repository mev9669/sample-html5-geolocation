	function calc_distance(latpos1, longpos1, latpos2, longpos2) {
		//Convert degrees to radians
		var rad_lat1 = deg_to_rad(latpos1);
		var rad_lat2 = deg_to_rad(latpos2);
		var rad_long1 = deg_to_rad(longpos1);
		var rad_long2 = deg_to_rad(longpos2);

		//radius of the the Earth (statute miles)
		var radiusEarth = 3963.0;
		
		//Calculate Distance with the Great Circle Distance Formula
		var d = radiusEarth * (Math.acos(Math.sin(rad_lat1) * Math.sin(rad_lat2) + Math.cos(rad_lat1) * Math.cos(rad_lat2) * Math.cos(rad_long2 - rad_long1)));
		return d;
	}

	//Convert degrees to radians
	function deg_to_rad(degrees){
		return Math.PI * (degrees/180);
	}