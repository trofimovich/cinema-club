define(["jquery"], function($) {

	var helpersFn = {
		format: function(date) {
			var date = new Date(date);
			
			var monthNames = [
								"January", "February", "March",
								"April", "May", "June", "July",
								"August", "September", "October",
								"November", "December"
							];

			return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
		},

		countAge: function(dateOfBirth) {
			return ((new Date().getTime() - new Date(dateOfBirth)) / (24 * 3600 * 365.25 * 1000)) | 0;
		},

		convertTime: function(timeInMin) {
			return Math.floor(timeInMin/60) + "h " + (timeInMin % 60) + "min";
		}
	}

	return helpersFn;
});