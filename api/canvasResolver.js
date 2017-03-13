module.exports = function(req, res) {
  var data = JSON.parse(req.body.params);

  if (!data) {
    res.status(403 /* Unauthorized */ ).send('Invalid params');
    return;
  }

  var html = '<img style="max-width:100%;" src="' + data.src + '" height="300px"/>';
  res.json({
    body: html
  });
};