# NodeCourses


Comando para achar o NPM
==== dir express.cmd /s ======

1° npm install -g express-generator
2° express -e --git "nome"
3° na pasta "nome" => npm install
4° Ainda na pasta => npm install mysql2

5° npm install
6° npm install mysql2 --save 


================ mysql ================

1° mysql -u root -p          - abrindo o mysql
2° create database livraria  - criando a data base
3° show databases;	     - mostrando todos os bancos criados
4° use livraria              - selecionando o tabela

AS TABELAS CRIAR PARA CURSO E DISCIPLINAS

CURSO                   DISCIPLINAS
CURCODIGO PK            DISCODIGO PK
CURNOME                 DISNOME
                        CURCODIGO FK

EXEMPLO DE COMO CRIAR 

5° create table generos ( gencodigo int not null primary key, 
				  gennome char(40) not null);
6° insert into generos (gencodigo, gennome) values (1, 'Computacao'), (2, 'Fantasia'), (3,'Filosofia'), (4,'Politica');

7° create table livros(livcodigo int not null primary key auto_increment , livtitulo char(50) not null, livano int not null, gencodigo int not null, constraint fk_gencodigo foreign key (gencodigo) references generos (gencodigo));

insert into livros (livtitulo, livano, gencodigo) values ('O senhor dos aneis', 1927, 2);

