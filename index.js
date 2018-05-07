import app from './server/app';

app.listen(app.get('port'), () => {
  console.log(`Running on port ${app.get('port')}`);
});
