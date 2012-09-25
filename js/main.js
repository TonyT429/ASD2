$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addItem').on('pageinit', function(){

	var rbform = $('#recordbooksform'),
		rberrorslink = $('#rberrorslink')
	;
	
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
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){
	
};

	// Get value of selected Radio Button
	var radio = function() {
		return $('input:radio[name=series]:checked').val();
	};
	
	
var storeData = function(data){
	if (!data) {
		var id = Math.floor(Math.random()*1000001);
	} else {
		id = data;
		
		getSelectedRadio( ); // calls the value of the radio button
		var item = { };
			item.genre = [ "Genre:", $( '#genre' ).val() ];
			item.title = [ "Book Title:", $( '#btitle' ).val() ];
			item.author = [ "Author:", $( '#author' ).val() ];
			item.isbn = [ "ISBN #:", $( '#isbn' ).val() ];
			item.review = ["Comments:", $( '#review' ).val() ];
			item.rate = ["Rate:",$( '#rate' ).val() ];
			item.series = [ "Series:", series ]; // for radio buttons
			item.seriesname = [ "Series Name:", $( '#seriesname' ).val() ];
			item.seriesnum = [ "Series Number:", $( '#seriesnum' ).val() ];
			item.date = [ "Date:", $( '#date' ).val() ];    // correcting missing date field
			// Save data to local storage using JSON stringify to convert objects to a string.
			localStorage.setItem( id, JSON.stringify( item ) );
		alert ("Saved" ); 
		}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

