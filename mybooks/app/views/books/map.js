function (doc) {
	if (doc._id.substr(0, 8) === "library:") {
		emit(doc._id.substr(8), {
			"title": doc.title,
			"author": doc.author,
			"genre": doc.genre,
			"series": doc.series,
			"seriesName": doc.seriesName,
			"seriesNum": doc.seriesNum,
			"rate": doc.rate,
			"comments": doc.comments,
			"isbn": doc.isbn,
			"date": doc.date
		});
	}
};