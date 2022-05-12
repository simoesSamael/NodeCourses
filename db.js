
const mysql = require('mysql2/promise');

async function conectarBD() {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'estudos'
    })
    
    global.connection = connection;
    return global.connection;
}

async function listarDisciplina() {
    const conexao = await conectarBD();
    const [registros] = await conexao.query('select a.disnome, a.curcodigo, a.discodigo, b.curnome from disciplinas a, cursos b where b.curcodigo = a.curcodigo;');

    return registros; 
}

async function inserirDisciplina(carros) {
    const conexao = await conectarBD();
    const sql = "insert into disciplinas (discodigo, disnome, curcodigo) values (?,?, ?);";
    return await conexao.query(sql, [carros.modelo, carros.ano, carros.marca]);
}

async function apagaDisciplina(codigo) {
    const conexao = await conectarBD();
    const sql = " delete from disciplinas where discodigo =?;";
    return await conexao.query(sql, [codigo]);
}

async function selecionarDisciplina(codigo)
{
    const conn = await conectarBD()
    const sql = "select * from disciplinas where discodigo=?;"
    const [registro] = await conn.query(sql,[codigo])
    return registro && registro.length>0 ? registro[0] : {}
}

async function disciplinaAltera(disciplina)
{
    const conn = await conectarBD()
    const sql = "update disciplinas set disnome=?, curcodigo=? where discodigo=?;";


    return await conn.query(sql,[disciplina.disNome, disciplina.curCodigo, disciplina.disCodigo])
}

module.exports = { listarDisciplina, inserirDisciplina, apagaDisciplina, selecionarDisciplina, disciplinaAltera }
