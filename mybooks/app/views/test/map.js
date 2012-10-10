function(doc) {
	if (doc.created._at) {
		emit (doc.created_at,doc);
	}
};