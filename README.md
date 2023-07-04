# Lista de Tarefas Compartilhada
Segunda versão do trabalho prática sobre listas de tarefas compartilhadas

<div align="justify">

<div style="display: inline-block;">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/> 
<img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"/> 
<img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white"/> 
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/> 
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> 
</a> 
</div>

## Descrição do Trabalho

Uma lista de tarefas é uma ferramenta poderosa e versátil que oferece uma variedade de funcionalidades para ajudar os
usuários a gerenciar suas tarefas de forma eficiente. Dessa forma, você e seus colegas, decidiram utilizar uma lista de
tarefas compartilhada para que, além de cada um poder organizar as suas próprias tarefas, vocês também pudessem
editar listas de tarefas compartilhada entre vocês para se organizarem em relação a atividades em grupo, como tarefas
na universidade e estágio.
No entanto, ao pesquisarem por aplicações de listas de tarefas compartilhadas, vocês não encontraram nenhuma
aplicação disponível que atendesse às suas necessidades e que fosse segura o suficiente para confiarem os seus dados.
Como todos têm os conhecimentos necessários para o desenvolvimento de software, vocês decidiram criar uma
aplicação própria de lista de tarefas compartilhada que, além de atender às necessidades do grupo, será disponibilizada
para o público em geral que também buscam por uma ferramenta do tipo.
Após discutirem sobre as funcionalidades que uma aplicação descente de lista de tarefas compartilhada deve oferecer,
vocês elaboraram a uma lista descrevendo essas funcionalidades e que serão implementadas pela aplicação de vocês.
Abaixo, essas funcionalidades são apresentadas e descritas:

***

1. **Cadastro e autenticação de usuários**: A aplicação permite que os usuários se cadastrem, fornecendo um nome
de usuário e senha, além de informações como nome, telefone, e-mail. O cadastro é necessário para acessar todas
as funcionalidades da aplicação. O acesso a aplicação será através do nome de usuário e senha.
2. **Criação de listas de tarefas**: Após fazer acessar a aplicação, os usuários podem criar listas de tarefas para
organizar suas atividades. Cada lista deve ter um nome descritivo para facilitar a identificação. Além disso, a
aplicação deve ser capaz de apresentar a data e horário em que a lista foi criada e, também, a data e horário da
última modificação na lista foi realizada (e o responsável pela modificação, no caso de listas compartilhadas).
3. **Cadastro de tarefas**: Dentro de cada lista de tarefas, os usuários podem adicionar tarefas individuais. Cada tarefa
deve conter uma descrição, data de cadastro, a data de vencimento da tarefa (opcional) e a indicação se a tarefa
foi concluída ou não.
4. **Compartilhamento de listas de tarefas**: Os usuários têm a opção de convidar outros usuários para participarem
da edição suas listas de tarefas. Ao enviar um convite, o usuário convidado receberá uma notificação para aceitar
ou recusar o acesso à lista de tarefas.
5. **Aceitação ou recusa de convites**: Os usuários podem visualizar os convites recebidos para participar de listas
de tarefas compartilhadas. Eles têm a opção de aceitar o convite, o que permite que eles visualizem e editem a
lista compartilhada, ou recusar o convite, caso não estejam interessados em participar.
6. **Edição de listas compartilhadas**: Tanto o usuário criador da lista quanto os usuários convidados podem editar
as listas compartilhadas. Eles podem adicionar, remover ou modificar tarefas, permitindo a colaboração e
atualização em tempo real.
7. **Exclusão de listas de tarefas**: Apenas o usuário criador da lista tem permissão para apagá-la. Essa
funcionalidade garante que as listas compartilhadas não sejam excluídas acidentalmente por usuários
convidados.
8. **Listagem de listas de tarefas**: A aplicação deve oferecer uma visão geral das listas de tarefas criadas pelo
usuário, permitindo que ele as liste e selecione para visualização e edição.
9. **Visualização e edição de listas de tarefas**: Os usuários podem visualizar suas listas de tarefas e as listas
compartilhadas. Eles têm a opção de marcar tarefas como concluídas e editar detalhes das tarefas.

***

Essas funcionalidades essenciais garantem que os usuários tenham controle total sobre suas listas de tarefas e possam
colaborar com outras pessoas quando necessário. A aplicação oferecerá uma experiência intuitiva e eficaz para o
gerenciamento de tarefas, auxiliando na produtividade e organização pessoal.



## Tarefas

### Tarefa 1

Dada a especificação da aplicação acima, realize a modelagem conceitual, gerando como resultado um Diagrama Entidade
Relacionamento (DER).


### Tarefa 2

A partir do DER obtido na Tarefa 01, utilize as regras de mapeamento DER/Relacional para construção do modelo lógico
relacional.

users(<u>id</u>,name,username,password, phone, email)

taskList(<u>id</u>,name, created_at, updated_at, userId)
    userId referencia users

task(<u>id</u>, descricao, conclusion, deadline, created_at, taskListsId)
    taskListsId referencia taskList

share (<u>id</u>, accepted, invite_at, taskListsId, userId)
    taskListId referencia taskList
    userId referencia users

    
### Tarefa 3

A partir do modelo lógico relacional obtido na Tarefa 02, escreva um script SQL para construção do esquema do banco
de dados. Considere que será utilizado o SGBD MySQL para implantação da aplicação.

CREATE TABLE task(<br>
    id int NOT NULL AUTO_INCREMENT, <br>
    descricao varchar(255) NOT NULL, <br>
    conclusion tinyint NOT NULL, <br>
    deadline datetime NOT NULL, <br>
    created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), <br>
    taskListsId varchar(36) NULL, <br>
    PRIMARY KEY (id));<br>

CREATE TABLE users (<br>
    id int NOT NULL AUTO_INCREMENT, <br>
    name varchar(255) NOT NULL, <br>
    username varchar(56) NOT NULL, <br>
    password varchar(255) NOT NULL, <br>
    phone varchar(255) NOT NULL, <br>
    email varchar(255) NOT NULL, <br>
    PRIMARY KEY (id));<br>

CREATE TABLE taskList (<br>
    id varchar(36) NOT NULL, <br>
    name varchar(255) NOT NULL, <br>
    created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), <br>
    updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), <br>
    userId int NULL, <br>
    PRIMARY KEY (id)); <br>

CREATE TABLE share (<br>
    id int NOT NULL AUTO_INCREMENT, <br>
    accepted tinyint NOT NULL, <br>
    invite_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), <br>
    taskListsId varchar(36) NULL, <br>
    userId int NULL, <br>
    PRIMARY KEY (id));<br>

### Tarefa 4

Implemente a aplicação especificada acima de forma que ela faça uso do banco de dados construído na Tarefa 03. Pode
ser criada uma aplicação de terminal ou uma aplicação com interface gráfica (desktop ou Web). Essa escolha ficará a
cargo do grupo de trabalho. A linguagem de programação também deve ser determinada pelo grupo.

***

Nosso grupo decidiu desenvolver uma aplicação com uma interface web. Para o backend, optamos por utilizar TypeScript como 
linguagem de programação, e o banco de dados designado foi o MySQL. Para o frontend, escolhemos utilizar HTML juntamente 
com o framework TailWind e adicionamos scripts em JavaScript para aprimorar a funcionalidade da aplicação. Nossa aplicação 
consistiu de quatro telas principais, sendo elas uma landing page, tela de cadastro, de login, a home do usuário contendo 
as listas e uma tela de tarefas para cada lista.

***

### Tarefa 5

Escreva um script SQL com todas as consultas utilizadas na implementação da aplicação.


        Coloca chaves estrangeiras nas tabelas:
        ALTER TABLE task 
        ADD CONSTRAINT FK_a175363c2a1175f22ed36b4399f 
        FOREIGN KEY (taskListsId) REFERENCES taskList(id) 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION;

        ALTER TABLE taskList 
        ADD CONSTRAINT FK_dfe093f3246bc267e00f0c7d54c 
        FOREIGN KEY (userId) REFERENCES users(id) 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION;


        ALTER TABLE share 
        ADD CONSTRAINT FK_7cd7b823095a0c0509c9d350d95 
        FOREIGN KEY (taskListsId) REFERENCES taskList(id) 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION;

        ALTER TABLE share 
        ADD CONSTRAINT FK_07e293248ed4aeb7965af840b13 
        FOREIGN KEY (userId) REFERENCES users(id) 
        ON DELETE NO ACTION 
        ON UPDATE NO ACTION;
        

        Selects:
        SELECT (name, username, phone, email) FROM users WHERE users.id=user_id; 
        Mostra as informações do usuário no perfil.

        SELECT (name, created_at, updated_at) FROM taskList WHERE taskList.userId=user_id;
        Mostra as listas(e as características nome, data de criação e data de modificação dela) que foram criadas pelo usuário.

        SELECT (name, created_at, updated_at) FROM share WHERE share.userId=user_id && share.accepted=true;
        Mostra as listas (e as características nome, data de criação e data de modificação dela) que foram compartilhadas com o usuário e ele aceitou o compartilhamento;

        SELECT (u.name) FROM share AS s
        JOIN users AS u ON u.id=s.userID && s.accepted=true
        JOIN taskList AS t ON t.id=list_id;
        Mostra o nome dos usuários que foram convidados para uma tabela x e aceitaram.

        SELECT (t.descricao, t.deadline, t.created_at) FROM tasks AS t WHERE t.taskListsId=list_id;
        Seleciona descrição, data de criação e prazo da tarefa de uma determinada lista.

        SELECT * FROM users WHERE users.email=email;
        Login, pega pelo email o usuário e depois ele usa o hash que está no banco para ver se aquele hash do banco for descriptografável usando a senha que o usuário mandou, o login segue, caso contrário, um erro é retornada.

        INSERT INTO users( name, username, password, phone, email);
        Insert usado para o cadastro de usuários, o id é auto incrementado.

        INSERT INTO taskList(name, userId);
        Insert usado para o cadastro de lista de tarefas, o nome é o único parâmetro que o usuário precisa fornecer, as datas de criacao e de ultima modificação o programa pega da rede automaticamente. O userId o usuário não precisa fornecer, mas há um método que pega ele da sessão do login e passa para o insert.

        INSERT INTO task( descricao, deadline, taskListId);
        Insert usado para inserir uma tarefa em uma determinada lista, o usuário precisa fornecer somente o prazo se houver e a descricao da tarefa, o id da lista a aplicação ja pega da página que o usuário está (localStorage).

        INSERT INTO share( taskListsId, userId);
        Compartilha uma tabela com um usuário, nesse caso, o que convida, escreve o nome do usuário e por meio do select abaixo, pega o id, e adiciona na tabela de compartilhamentos.

        Apaga tabelas:
            DROP TABLE share;
            DROP TABLE taskList;
            DROP TABLE users;
            DROP TABLE task;

        Apaga tarefas(aplicação ja fornece o id):
            DELETE FROM task WHERE task.id = task_id;

        Apagar lista de tarefas(aplicação ja fornece o id):
            DELETE FROM taskList WHERE taskList.id = taskList_id;

        Não se usa o grant para setar privilégios, pois a aplicação que faz o tratamento se um usuário é ou não criado da lista para permitir ou não que ele apague algo.
        

 O tratamento de MySql injection é feito com o próprio framework que utilizamos para desenvolvimento, o typeorm.
  
