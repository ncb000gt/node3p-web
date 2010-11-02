var couchapp = require('couchapp'),
    path = require('path');

var ddoc = {_id:"_design/node3p-web", views:{}};

module.exports = ddoc;

ddoc.views.getAlbums = {
    map: function(doc) {
        emit({album:doc.album, primary: doc.primary, image: doc.image.replace("SS75", "SS225"), large_image: doc.image.replace("SS75", "SS500")}, null);
    },
    reduce: function(key, values, rereduce) {
        return null;
    }
};

ddoc.views.getDailyFiles = {
    map: function(doc) {
        var d = new Date();
        d.setDate(d.getDate()-1);
        if ('created' in doc) {
            var created = new Date(doc.created);
            if (created > d) emit(doc._id, doc.filename);
        }
    }
};