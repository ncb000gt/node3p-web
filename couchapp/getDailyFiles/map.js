function(doc) {
  var d = new Date();
  d.setDate(d.getDate()-1);
  if ('created' in doc) {
    var created = new Date(doc.created);
    if (created > d) emit(doc._id, doc.filename);
  }
};