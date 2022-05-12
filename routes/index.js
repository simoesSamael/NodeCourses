
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  const registros = await global.db.listarDisciplina();
  res.render('index', { title: 'Express', registros });
});

router.get('/novaDisciplina', function(req, res) {
  res.render('formDisciplina', { titulo: 'Nova Disciplina' , acao: 'novaDisciplina'})
}); 

router.get('/alteraDisciplina/:id', async function(req, res) {
  const codigo = parseInt(req.params.id);

  try
  {
    const registro = await global.db.selecionarDisciplina(codigo)
    res.render('formDisciplinasALT', {title: "Alteração de disciplina", registro, action: "/disciplinaAltera/"+codigo })
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
});

router.get('/apagaDisciplina/:id', async function(req, res) {
  const codigo = parseInt(req.params.id);
  await global.db.apagaDisciplina(codigo);
  res.redirect('/');
}); 

router.post('/novaDisciplina', async function(req, res){
  const codigoDisciplina = req.body.codigoDisciplina;
  const nomeDisciplina = req.body.nomeDisciplina;
  const curso = req.body.nomeCurso;

  await global.db.inserirDisciplina({codigoDisciplina, nomeDisciplina, curso});
  res.redirect('/')
})

router.post('/disciplinaAltera/:id', async function(req, res) {
  debugger;

  const disCodigo = parseInt(req.params.id);
  const disNome = req.body.edtNome;
  const curCodigo = !req.body.curCodigo ? null : parseInt(req.body.curCodigo);

  try
  {
    await global.db.disciplinaAltera( {disNome, disCodigo, curCodigo } )
    res.redirect('/')
  }
  catch(erro)
  {
    res.redirect('/?erro='+erro)
  }
})

module.exports = router;
