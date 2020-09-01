import { db } from '../models/index.js';

const Account = db.bank;

const deposito = async (req, res) => {
  const conta = req.body.conta;
  const agencia = req.body.agencia;
  const balance = req.body.balance;

  try {
    const data = await Account.updateOne(
      { conta: conta, agencia: agencia },
      { $inc: { balance: balance } }
    );

    const newvalue = await Account.findOne({ conta: parseInt(conta) });
    if (!newvalue) {
      res.send('Nao encontrato a conta: ' + conta);
    } else {
      res.send(newvalue);
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar o podcast id: ' + id + ' ' + error);
  }
};

const saque = async (req, res) => {
  const conta = req.body.conta;
  const agencia = req.body.agencia;
  const balance = req.body.balance;

  try {
    const contaUsuario = await Account.find({ conta: conta });
    if (!contaUsuario[0]) {
      console.log('morreu');
      res.send('Nao encontrato a conta: ' + conta);
    }
    if (contaUsuario[0].balance > balance) {
      const data = await Account.updateOne(
        { conta: conta, agencia: agencia },
        { $inc: { balance: -balance } }
      );
    } else {
      res.send('Saldo Insuficiente');
    }
    const newvalue = await Account.find({ conta: conta });
    res.send(newvalue);
  } catch (error) {
    res.status(500).send('Erro ao atualizar o podcast id: ' + error);
  }
};

const consultaSaldo = async (req, res) => {
  const conta = req.body.conta;
  const agencia = req.body.agencia;

  try {
    const data = await Account.findOne({ conta: conta, agencia: agencia });
    if (!data) {
      res.send('Nao encontrato a conta: ' + conta);
    } else {
      res.send('O saldo da conta é ' + data.balance);
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar o podcast id: ' + id + ' ' + error);
  }
};

const remove = async (req, res) => {
  const conta = req.body.conta;
  const agencia = req.body.agencia;

  try {
    const data = await Account.findOneAndDelete({
      conta: conta,
      agencia: agencia,
    });
    const numeroAgencia = await Account.countDocuments({ agencia: agencia });

    if (!data) {
      res.send('Nao encontrato o podcast id: ' + id);
    } else {
      res.send(
        'Podcast excluido com sucesso e numero total de contas na agencia é de' +
          numeroAgencia
      );
    }
  } catch (error) {
    res.status(500).send('Erro ao excluir o podcast id: ' + id + ' ' + error);
  }
};

const consultaMediaAgencia = async (req, res) => {
  const agencia = req.body.agencia;

  try {
    const balanceAvg = await Account.aggregate([
      { $match: { agencia: parseInt(agencia) } },
      {
        $group: { _id: { agencia: '$agencia' }, balance: { $avg: '$balance' } },
      },
    ]);

    res.send(balanceAvg);
  } catch (error) {
    res.status(500).send('Erro ao atualizar o podcast id: ' + id + ' ' + error);
  }
};

const transferencia = async (req, res) => {
  const contaOrigem = parseInt(req.body.contaOrigem);
  const contaDestino = parseInt(req.body.contaDestino);
  const valorTransfer = parseInt(req.body.valor);

  try {
    const conta1 = await Account.findOne({ conta: contaOrigem });
    const conta2 = await Account.findOne({ conta: contaDestino });

    if (conta1.agencia === conta2.agencia) {
      await Account.updateOne(
        { conta: contaDestino },
        { $inc: { balance: valorTransfer } }
      );
      await Account.updateOne(
        { conta: contaOrigem },
        { $inc: { balance: -valorTransfer } }
      );
    } else {
      await Account.updateOne(
        { conta: contaDestino },
        { $inc: { balance: valorTransfer + 8 } }
      );
      await Account.updateOne(
        { conta: contaOrigem },
        { $inc: { balance: -valorTransfer - 8 } }
      );
    }

    const newvalue = await Account.find({ conta: contaOrigem });
    res.send(newvalue);
  } catch (error) {
    res.status(500).send('Erro ao atualizar a conta : ' + error);
  }
};

const menoresSaldos = async (req, res) => {
  const quantidade = req.body.quantidade;

  try {
    const data = await Account.find()
      .sort({ balance: 1 })
      .limit(parseInt(quantidade));
    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao atualizar o podcast id: ' + id + ' ' + error);
  }
};

const maioresSaldos = async (req, res) => {
  const quantidade = req.body.quantidade;

  try {
    const data = await Account.find()
      .sort({ balance: -1 })
      .limit(parseInt(quantidade));
    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao atualizar o podcast id: ' + id + ' ' + error);
  }
};

const agenciaPremium = async (req, res) => {
  try {
    const agencia1 = await Account.find({ agencia: 25 })
      .sort({ balance: -1 })
      .limit(1);
    const agencia2 = await Account.find({ agencia: 33 })
      .sort({ balance: -1 })
      .limit(1);
    const agencia3 = await Account.find({ agencia: 47 })
      .sort({ balance: -1 })
      .limit(1);
    const agencia4 = await Account.find({ agencia: 10 })
      .sort({ balance: -1 })
      .limit(1);

    const contas = [agencia1, agencia2, agencia3, agencia4];

    contas.forEach(async (conta) => {
      await Account.updateOne(
        { conta: conta[0].conta },
        { $set: { agencia: 99 } }
      );
    });

    const agenciaPremium = await Account.find({ agencia: 99 });

    res.send(agenciaPremium);
  } catch (error) {
    res.status(500).send('Erro ao atualizar o podcast id: ' + error);
  }
};

export default {
  deposito,
  saque,
  consultaSaldo,
  remove,
  consultaMediaAgencia,
  transferencia,
  menoresSaldos,
  maioresSaldos,
  agenciaPremium,
};
