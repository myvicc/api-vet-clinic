import { application } from './app.js';
import { connect } from './db.js';

connect()
  .then(() => {
    console.log('connected to bd');
    return application.listen({
      host: '0.0.0.0',
      port: 3050,
    });
  })
  .then(() => console.log('server was started'))
  .catch((err) => console.log(err.message));
