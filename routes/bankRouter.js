import express from 'express';

import bankController from '../controllers/bankController.js';

const app = express();

app.patch('/bank/deposito', bankController.deposito);
app.patch('/bank/saque', bankController.saque);
app.get('/bank/consultaSaldo', bankController.consultaSaldo);
app.delete('/bank/remover', bankController.remove);
app.patch('/bank/transferencia', bankController.transferencia);
app.get('/bank/mediaAgencia', bankController.consultaMediaAgencia);
app.get('/bank/menoresSaldos', bankController.menoresSaldos);
app.get('/bank/maioresSaldos', bankController.maioresSaldos);
app.get('/bank/agenciaPremium', bankController.agenciaPremium);

/*
app.put('/bank/saque', bankController.saque);
app.get('/bank/', bankController.saldo);
app.delete('/bank/', bankController.remove);
app.put('/bank/transferencia', bankController.transferencia);
app.get('/bank/agencia', bankController.media);
app.get('/bank/menorsaldo', bankController.menorsaldo);
app.get('/bank/ricos', bankController.ricos);
app.get('/bank/menorsaldo', bankController.menorsaldo);
app.put('/bank/private', bankController.contaprivate);
*/
export { app as bankRouter };
