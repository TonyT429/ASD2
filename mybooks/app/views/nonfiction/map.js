function (doc) {
	if (doc._id.substr(0,19) === "library:nonfiction:") {
		emit(doc._id.substr(19), {
			"title": doc.title,
			"author": doc.author,
			"genre": doc.genre,
			"series": doc.series,
			"seriesName": doc.seriesName
		});
	}
};