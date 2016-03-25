mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/restaurants');

if (titleArray.length == 0) {
  request('http://srw.seattletimes.com/#/', function (error, response, data) {
  if (!error && response.statusCode == 200) {
        var $ = cheerio.load(data);

        $('tbody tr').each(function(index, element) {
          titleArray.push({ "name" : $(element).children('td').children('.post-title').text().trim(), 
                            "cuisine" : $(element).attr('data-cuisine'),
                            "neighborhood" :  $(element).attr('data-neighborhood'), 
                            "meal" : $(element).attr('data-meals'),
                            "link" : $(element).children('td').children('.post-title').attr('href')});
        });
        console.log(titleArray);

      }
      Restaurant.create(titleArray, function(err, restaurant) {
        if (err) console.log(err);
      });
  });
}