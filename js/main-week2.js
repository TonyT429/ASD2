//  Anthony Torrez
//  ASD 1210 Week3

$('#home').on('pageinit', function(){
	//code needed for home page goes here
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
				break;
			case "off":
				$("#addItem").css("display", "block");
				$('#getBookList').css("display", "inline");
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
			localStorage.setItem(id, JSON.stringify( item) );
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

// Week 2 Data Serialization
$('#serial').on('pageinit', function(){

	// Serialization of XML Data
	$('#xmlBooks').on('click', function() {
     	$('#theShelf').empty();
		$.ajax({
	        	url: 'xhr/data.xml',
	            type: 'GET',
	            dataType: 'xml',
	            success: function(xml) {
	                $(xml).find('item').each(function() {
	                    var item = $(this).find('item').text();
	                    var title = $(this).find('title').text();
					var author = $(this).find('author').text();
	                    var isbn = $(this).find('isbn').text();
	                    var comments = $(this).find('comments').text();
	                    var rate = $(this).find('rate').text();                    
	                    var series = $(this).find('series').text();
	                    var seriesName = $(this).find('seriesName').text();
	                    var seriesNum = $(this).find('seriesNum').text();
	                    var date = $(this).find('date').text();
                         $("" +
                             '<li>' +
                                 '<h3>Title:  ' + title + '</h3>' +
                                   '<p>Author:  ' + author + '</p>' +
                                   '<p>ISBN:  ' + isbn + '</p>' +
                                   '<p>Comments:  ' + comments + '</p>' +
                                   '<p>Rate:  ' + rate + '</p>' +
                                   '<p>Series:  ' + series + '</p>' +
                                   '<p>Series Name:  ' + seriesName + '</p>' +
                                   '<p>Number in Series:  ' + seriesNum + '</p>' +
                                   '<p>Date:  ' + date + '</p>' +
                              '</li>'
                              ).appendTo('#theShelf');
                              $('#theShelf').listview('refresh');
				});
            	}
	    });
	});


     
     
// Serialization of JSON Data
$('#jsonBooks').on('click', function() {
          $('#theShelf').empty();
          $.ajax({
            url: 'xhr/data.json',
            type: 'GET',
               dataType: 'json',
               success: function(responseText) {
                   for (var i=0, j=responseText.items.length; i<j; i++){
                    var book = responseText.items[i];
                             $(""+
                             '<li>' +
                                    '<h3>Title:  ' + book.title + '</h3>' +
                                       '<p>Author:  ' + book.author + '</p>' +
                                       '<p>Genre:  ' + book.genre + '</p>' +
                                     '<p>ISBN:  ' + book.isbn + '</p>' +
                                    '<p>Comments:  ' + book.comments + '</p>' +
                                    '<p>Series:  ' + book.series + '</p>' +
                                    '<p>Series Name:  ' + book.seriesName + '</p>' +
                                    '<p>Number in Series:  ' + book.seriesNum + '</p>' +
                                    '<p>Date:  ' + book.date + '</p>' +
                        '</li>'
                        ).appendTo('#theShelf');
                              $("#theShelf").listview("refresh");
                                  console.log("Working");
                                  console.log(responseText);
                    }
            }  
               }
          );
          return false;
     });

     	
});	


/*
// Week 3 Eclipse, CouchDB, and Cloudant
$('#serial').on('pageinit', function(){
    $('#couchBooks').on('click', function() {
        $('#theCouch').empty();
          $.ajax({
//			url: '_view/books',
			url: '/mybooks/_all_docs?include_docs=true&startkey="library:fiction:book0001"&endkey="library:nonfiction:zzz"',
			type: 'GET',
               dataType: 'json',
               success: function(responseText) {
				$.each(responseText.rows, function(index, rows) {
					var title = rows.value.title;
					var author = rows.value.title;
					var isbn = rows.value.isbn;
					var genre = rows.value.genre;
					var series = rows.value.series;
					var seriesName = rows.value.seriesName;
					var seriesNum = rows.value.seriesNum;
					var rate = rows.value.rate;
					var comments = rows.value.comments;
					var date = rows.value.date;
                         	$(""+
                         	'<li>' +
							'<h3>' + title + '</h3>' +
                                  	 '<p>' + author + '</p>' +
                                  	 '<p>' + genre + '</p>' +
                                	 '<p>' + isbn + '</p>' +
                                    '<p>' + comments + '</p>' +
                                    '<p>' + series + '</p>' +
                                    '<p>' + seriesname + '</p>' +
                                    '<p>' + seriesnum + '</p>' +
                                    '<p>' + date + '</p>' +
                              '</li>'
						).appendTo('#theCouch');
                              $("#theCouch").listview("refresh");
                              	console.log("Working");
                              	console.log(responseText);
                    }
			}, 
               }
          });
          return false;
     });


$('#serial').on('pageinit', function(){

// Serialization of JSON Data
	$('#jsonBooks').on('click', function() {
		$('#myLibrary').empty();
		$('#theShelf').empty();
		$.ajax({
			url: '/booktracker/_all_docs?include_docs=true&startkey="library:fiction:book0001"&endkey="library:nonfiction:zzz"',
			type: 'GET',
			dataType: 'json',
			success: function(responseText) {
				console.log(responseText);
				$.each(responseText.rows, function(index, item) {
					var title = item.doc.title;
					var author = item.doc.author;
					var isbn = item.doc.isbn;
					var genre = item.doc.genre;
					var comments = item.doc.comments;
					var series = item.doc.series;
					var seriesName = item.doc.seriesName;
					var seriesNum = item.doc.seriesNum;
					var date = item.doc.date;
					$(""+
                         	'<li>' +
							'<h3>' + title + '</h3>' +
                                  	 '<p>' + author + '</p>' +
                                  	 '<p>' + genre + '</p>' +
                                	 '<p>' + isbn + '</p>' +
                                    '<p>' + comments + '</p>' +
                                    '<p>' + series + '</p>' +
                                    '<p>' + seriesname + '</p>' +
                                    '<p>' + seriesnum + '</p>' +
                                    '<p>' + date + '</p>' +
                              '</li>'
						).appendTo('#theCouch');
				});
				$('#theShelf').listview('refresh');
			}
		});
	});    
});




