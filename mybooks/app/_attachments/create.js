// Get value of selected Radio Button 
var selectedRadio = function() {
	return $("input:radio[name=series]:checked").val();
};

var storeData = function(key) {
	if (!key) {
		var id = Math.floor(Math.random() * 1000001);
	} else {
		id = key;
		button = selectedRadio();  //calls the value of the radio button
		var item = {};
			item.genre = ["Genre:", $('#genre').val()];
			item.title = ["Book Title:", $('#title').val()];
			item.author =["Author:",$('#author').val()];
			item.isbn = ["ISBN:",$('#isbn').val()];
			item.comments = ["Comments:",$('#comments').val()];
			item.rate = ["Rate:",$('#rate').val()];
			item.series = ["Series:",button];
			item.seriesname = ["Series Name:",$('#seriesname').val()];
			item.seriesnum = ["Series Number:",$('#seriesnum').val()];
			item.date = ["Date:",$('#date').val()];
			console.log(item);
//			localStorage.setItem(id, JSON.stringify( item) );
		var dbase = $.couch.db(mybooks);
		db.saveDoc(item, {
			success: function(data) {
				console.log(data);
			}
		})
	}
	return false;
}; 


$('#savedata').on("pageshow", function() {
	$couch.db('mybooks').view("mybooks/" {
		success: function(data) {
			console.log(data);
		}
	})
});

