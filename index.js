const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const editais = [
  {
    id: 1,
    titulo: "Aquisição de medicamentos",
    status: "aberto",
    regiao: "RJ",
    modalidade: "pregão",
    dataAbertura: "2025-05-10",
    dataInicio: "2025-05-08",
    categoria: "Saúde",
    valor: 55000
  },
  {
    id: 2,
    titulo: "Contratação de serviços de TI",
    status: "homologado",
    regiao: "SP",
    modalidade: "dispensa",
    dataAbertura: "2025-04-20",
    dataInicio: "2025-04-15",
    categoria: "Tecnologia",
    valor: 125000
  }
];

app.get('/api/editais', (req, res) => {
  let resultado = editais;

  if (req.query.status) {
    resultado = resultado.filter(e => e.status === req.query.status);
  }

  if (req.query.regiao) {
    resultado = resultado.filter(e => e.regiao === req.query.regiao);
  }

  if (req.query.modalidade) {
    resultado = resultado.filter(e => e.modalidade === req.query.modalidade);
  }

  if (req.query.categoria) {
    resultado = resultado.filter(e => e.categoria === req.query.categoria);
  }

  if (req.query.valorMin) {
    resultado = resultado.filter(e => e.valor >= parseFloat(req.query.valorMin));
  }

  if (req.query.valorMax) {
    resultado = resultado.filter(e => e.valor <= parseFloat(req.query.valorMax));
  }

  if (req.query.q) {
    resultado = resultado.filter(e =>
      e.titulo.toLowerCase().includes(req.query.q.toLowerCase())
    );
  }

  res.json(resultado);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
