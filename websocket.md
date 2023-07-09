Informações que o usuário precisa ter:
id_privado
id_publico: para se conectar com ele, precisa passar esse id público para o socket.join(id_publico) que vai estar disponível na página de chat da pessoa que vc está se comunicando
id_publico pode ser como um nome de perfil do twitter

socket.to: emite um evento para todos exceto quem enviou (para se por exemplo eu quisesse montar a mensagem no próprio cliente via javascript)

io.to: emite um evento para todos, inclusive quem enviou