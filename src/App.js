import api from './service/api'
import './App.css'
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs'

function App() {
  const [usuarios, setUsuarios] = useState([])

  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState();


  useEffect(
    () => {
      buscarCadastroTable()

    }, []
  )

  async function buscarCadastroTable() {
    await api.get('/cadastro').then((response) => {
      setUsuarios(response.data)
    })

  }

  async function cadastrarUsuario() {
    const usuario = {
      email,
      cpf,
      nome,
      nascimento,
    }


    if (cpf) {
      await api.post('/cadastro', usuario).then((response) => {
        setUsuarios([...usuarios, response.data])
        alert('Usuario cadastrado com sucesso!')
        limparForm();
      })
    } else {
      alert('Digite um CPF valido')
    }

  }

  function limparForm() {
    setEmail('')
    setCpf('')
    setNome('')
    setNascimento('')
  }

  async function excluirCadastro(cpf) {
    await api.delete(`/cadastroCpf/${cpf}`).then(() => {
      buscarCadastroTable()
      alert("Cadastro excluido com sucesso ")
    })
  }


  return (
    <div className='container'>
      <h1 className='th'> Cadastrar usuario</h1>
      <InputGroup className="mb-3 mt-5">
        <Form.Control
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}

        />
      </InputGroup>
      <InputGroup className="mb-2">
        <Form.Control
          placeholder="CPF"
          value={cpf}
          onChange={(e) => { setCpf(e.target.value) }}
        />
      </InputGroup>
      <InputGroup className="mb-2">
        <Form.Control
          placeholder="Nome"
          value={nome}
          onChange={(e) => { setNome(e.target.value) }}
        />
      </InputGroup>
      <InputGroup className="mb-2">
        <Form.Control
          placeholder="Nascimento"
          value={nascimento}
          onChange={(e) => { setNascimento(e.target.value) }}
        />
      </InputGroup>
      <Button onClick={cadastrarUsuario} className='ca'> Cadastrar </Button>
      <Table striped bordered hover className='mt-5'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Cpf</th>
            <th>Nome</th>
            <th>Nascimento</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((c) => {
            return (
              <tr>
                <td>{c.id}</td>
                <td>{c.email}</td>
                <td>{c.cpf}</td>
                <td>{c.nome}</td>
                <td>{c.nascimento}</td>
                <td><Button variant="outline-danger" onClick={() => { excluirCadastro(c.cpf) }}>
                  <BsTrash />
                </Button></td>
              </tr>
            )
          })}
        </tbody>
      </Table>

    </div>
  )
}

export default App;
