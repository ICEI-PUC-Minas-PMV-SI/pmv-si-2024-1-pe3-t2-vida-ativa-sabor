const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5500;
const db = new sqlite3.Database('database.db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.use(express.static(path.join(__dirname, 'src')));

app.get('/login', (req, res) => {
    res.render('login', { nome: '' }); 
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT NOME,ID,ADM FROM users WHERE email = ? AND senha = ?', [email, password], (err, row) => {
        if (err) {
            console.error('Erro ao verificar credenciais:', err);
            res.status(500).send('Erro ao verificar credenciais.');
        } else if (row) {
            
            res.cookie('nome', row.NOME);
            res.cookie('id', row.ID); 
            res.cookie('adm',row.ADM);
            res.redirect('/');
        } else {
            
            res.redirect('/login?loginError=true');
        }
    });
});

app.post('/cadastro', (req, res) => {
    const { nome, data_nascimento, email, senha, telefone } = req.body;

    db.run('INSERT INTO users (NOME, DATNAS, EMAIL, SENHA, TEL) VALUES (?, ?, ?, ?, ?)', [nome, data_nascimento, email, senha, telefone], (err) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).send('Erro ao cadastrar usuário.');
        } else {
            console.log('Usuário cadastrado com sucesso.');
            res.redirect('/');
        }
    });
});

app.get('/usuarios', (req, res) => {
    
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error('Erro ao consultar usuários:', err);
            res.status(500).send('Erro ao consultar usuários.');
        } else {
            res.json(rows); 
        }
    });
});


app.get('/', (req, res) => {
    const NOME = req.cookies.nome || '';
    const ID = req.cookies.id || ''; 
    res.render('index', { nome: NOME, id: ID });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.post('/editar-usuario', (req, res) => {
    const { ID, NOME, DATNAS, EMAIL, SENHA, TEL } = req.body;

    
    console.log('Dados recebidos para edição:', { ID, NOME, DATNAS, EMAIL, SENHA, TEL });

    
    db.run('UPDATE users SET NOME = ?, DATNAS = ?, EMAIL = ?, SENHA = ?, TEL = ? WHERE ID = ?', 
        [NOME, DATNAS, EMAIL, SENHA, TEL, ID], 
        (err) => {
            if (err) {
                console.error('Erro ao editar usuário:', err);
                res.status(500).send('Erro ao editar usuário.');
            } else {
                console.log('Usuário editado com sucesso.');
                res.sendStatus(200); 
            }
        }
    );
});

