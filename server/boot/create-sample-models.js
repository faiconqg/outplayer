module.exports = function(app) {
    app.dataSources.mysqlLocal.automigrate('Merchant', function(err) {
      if (err) throw err;
  
      app.models.Merchant.create([{
        name: 'Faiconl Cafe'
      }, {
        name: 'Faicon Farm'
      }, ], function(err, merchants) {
        if (err) throw err;
  
        console.log('Models created: \n', merchants);
      });
    });
  };