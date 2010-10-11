function(doc) {
  emit({album:doc.album, primary: doc.primary, image: doc.image.replace("SS75", "SS225"), large_image: doc.image.replace("SS75", "SS500")}, null);
}