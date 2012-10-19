function (doc) {
	if (doc._id.substr(0,16) === "library:fiction:") {
		emit(doc._id.substr(16), {
			"title": doc.title,
			"author": doc.author,
			"genre": doc.genre,
			"series": doc.series,
			"seriesName": doc.seriesName
		});
	}
};