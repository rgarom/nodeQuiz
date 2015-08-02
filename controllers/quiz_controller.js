exports.question = function(req, res) {
  res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

exports.answer = function(req, res) {
  if (req.query.respuesta === 'Roma') {
    res.render('quizes/answer', {respuesta: 'Correcto', errors: []});
  } else {
    res.render('quizes/answer', {respuesta: 'Incorrecto'});
  }
};

exports.author = function(req, res) {
  res.render('author', {autor: 'Rafael Garrido Romero'});
};

exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.create = function(req, res) {
  var quiz= models.Quiz.build( req.body.quiz );

  quiz
  validate()
  .then( function (err) {
    if (err) {
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    } else {
      quiz
      .save({fields: ["pregunta", "respuesta"]})
      .then(function() {
        res.redirect('/quizes');
      })
    }
  });
};

exports.edit = function (req, res) {
  var quiz = req.quiz;

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function (req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz
  .validate()
  .then( function (err) {
    if (err) {
      res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
    } else {
      req.quiz
      .save({fields: ["pregunta", "respuesta"]})
      .then(function() {
        res.redirect('/quizes');
      })
    }
  });
};

exports.index = function (req, res) {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes, errors: []});
    }
  ).catch(function(err) {next(err)});
};

exports.destroy = function (req, res) {
  req.quiz.destroy().then( function(){
    res.redirect('/quizes');
  })
  .catch(function(err) {next(err)});
};
