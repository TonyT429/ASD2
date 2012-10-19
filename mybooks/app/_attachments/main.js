$('#home').on('pageinit', function(){

});	
		
		
$('#addItem').on('pageinit', function(){
	var rbform = $('#recordbooksform'),
		rberrorslink = $('#rberrorslink');
	rbform.validate({
		invalidHandler: function(form, validator){
			rberrorslink.click();
			var html = '';
			//console.log(validator.submitted);
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');  // error with a label except those generated.
				//console.log(label.text());
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');  
				var fieldName = legend.length ? legend.text() : label.text();
				console.log(fieldName);
				html += '<li>'+ fieldName +'</li>';
			};
			$("#recordbookserrors ul").html(html);
		},
		submitHandler: function() {
			var data = rbform.serializeArray();
			localStorage.setItem('rbform', data);
			storeData(data);
		}
	});
});


var autofillData = function (){
	 for(var b in json) {
	 	var id = Math.floor(Math.random() * 1000001);
	 	localStorage.setItem(id, JSON.stringify(json[b]));
	 	console.log(json);
	 }
};


	function toggleControls(n){
		switch(n) {
			case "on":
				$("#addItem").css("display", "none");
				$('#getBookList').css("display", "none");
				$('#display').css("display", "block");
				$('#couchBooks').css("display", "none");
				break;
			case "off":
				$("#addItem").css("display", "block");
				$('#getBookList').css("display", "inline");
				$('#couchBooks').css("display", "inline");
				break;
			default:
				return false;
		}
	}


$('#getBookList').on('click', getBookList);
	// Check to see if there is any data in local storage.  Import JSON data if empty.
	function getBookList() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("Your bookshelf was empty so example books were added");
			autofillData();
		}
		var list = $.find('#listOfBooks');
		$('#bookList').attr('id', 'items');
		for (var i = 0, j = localStorage.length; i < j; i++) {
			var makeLi = $('<li class="bookItem"></li>').appendTo(list);
			var linksLi = $('<li class="bookLink"></li>').appendTo(list);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value);
			for(var x in object){
				$('<p>' + object[x][0] + object[x][1] + '</p>').appendTo(makeLi);
			}
			makeBookLinks(localStorage.key(i), linksLi);
		}
		$('#listOfBooks').listview('refresh');	
	};
	
	
	var makeBookLinks = function(key, listLi) {
		var deleteLink = $(listLi).append('<a href="#">Delete Book Information</a>');
		deleteLink.key = key;
		$('#deleteLink').on('click', deleteLink);
		var editLink = $(linksLi).append('<a href="#">Edit Book Information</a>');
		editLink.key = key;
		$('editLink').on('click', editItem);
	}

var my_db = "mybooks";
	
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

//			localStorage.setItem(id, JSON.stringify(item) );
		var db = $.couch.db(my_db);
		db.saveDoc(item, {
			success: function(item) {
				console.log(item);
				
			}
		})
	}
	return false;
}; 


var	deleteItem = function (){
	var verify = confirm('Delete this book?');
	if(verify) {
		localStorage.removeItem(this.key);
		window.location.reload();
	} else {
		alert ("Book Deletion Cancelled");
	}		
};	

	
$('#display').on('click', display);
	function display() {
		if (localStorage.length === 0){
			alert("There are no books to display");
			autofillData();
		} else {
		getBookList();
		}
	};
			
					
$('#clearLocal').on('click', clearLocal);
	function clearLocal() {
		if(localStorage.length === 0) {
			alert("The bookshelf is empty, nothing to clear.");
		} else {
			localStorage.clear();
			alert("Bookshelf cleared, all books removed.");
			window.location.reload();
			return false;
		}
	};
	

var editItem = function () {
	var value = localStorage.key(this.key);
	var item = JSON.parse(value);
	$('title').value = item.title[1];
	$('author').value = item.author[1];
	$('genre').value = item.genre[1];
	$('isbn').value = item.isbn[1];
	$('series').value = item.series[1];
	$('seriesName').value = item.seriesName[1];
	$('seriesNum').value = item.seriesNum[1];
	$('comments').value = item.comments[1];
	$('rate').value = item.rate[1];
	$('date').value = item.date[1];
	$('#editItem').on('click', saveData);  
	$('storeData').val() = 'Edit';
	var editStoreData = $('storeData');
	$('#editStoreData').on('click', validate);
	editStoreData.key = this.key;	
}


$('#serial').on('pageinit', function(){

	// Serialization of JSON Data
		$('#couchBooks').on('click', function() {
			$('#theCouch').empty();
			$.ajax({
				url: '_view/books',
				type: 'GET',
				dataType: 'jsonp',
				success: function(responseText) {
					console.log(responseText);
					$.each(responseText.rows, function(index, rows) {
						var title = rows.value.title;
						console.log(title);
						var author = rows.value.author;
						var isbn = rows.value.isbn;
						var genre = rows.value.genre;
						var comments = rows.value.comments;
						var rate = rows.value.rate;
						var series = rows.value.series;
						var seriesName = rows.value.seriesName;
						var seriesNum = rows.value.seriesNum;
						var date = rows.value.date;
						$(""+
	                         	'<li>' +
								'<h3>Title =  ' + title + '</h3>' +
	                                  	 '<p>Author = ' + author + '</p>' +
	                                  	 '<p>Genre = ' + genre + '</p>' +
	                                	 '<p>ISBN = ' + isbn + '</p>' +
	                                    '<p>Comments = ' + comments + '</p>' +
	                                    '<p>Rate = ' + rate + '</p>' +
	                                    '<p>Series = ' + series + '</p>' +
	                                    '<p>Series Name = ' + seriesName + '</p>' +
	                                    '<p>Series Number = ' + seriesNum + '</p>' +
	                                    '<p>Date = ' + date + '</p>' +
	                              '</li>'
							).appendTo('#theCouch');
					});
					$('#theCouch').listview('refresh');
				},
				error: function(result) { 
					console.log(result);  
	               }
			});
		});    
	});



