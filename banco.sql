CREATE DATABASE sportx;

USE sportx;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    nome VARCHAR(100) not null,
    email VARCHAR(100) not null,
    senha VARCHAR(128) not null
)

DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
    id int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    tipo_pessoa VARCHAR(1) not null,
    nome VARCHAR(100) not null,
    cpf_cnpj VARCHAR(20) not null,
    cep VARCHAR(10) not null,
    email VARCHAR(100) not null,
    classificacao VARCHAR(100) null,
    userId int not null,
    CONSTRAINT fk_clientes_user_id FOREIGN KEY (userId)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)

DROP TABLE IF EXISTS telefones;

CREATE TABLE telefones (
    id int IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL,
    numero VARCHAR(14) not null,
    receber_sms bit null DEFAULT 0,
    receber_whatsapp bit null DEFAULT 0,
    receber_ligacoes bit null DEFAULT 0,
    clienteId int not null,
    CONSTRAINT fk_telefones_cliente_id FOREIGN KEY (clienteId)
        REFERENCES clientes (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)