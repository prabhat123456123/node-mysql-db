
const { app } = require('./src/app')
const { port } = require('./src/config')
const { db } = require('./src/models')


async function bootstrap() {
    try {
        db.sequelize.sync({force:false}).then(() => {
            app.listen(port, () => {
                console.log("server is running at this port");
            })
        }).catch((error) => {
            console.log(error)
        })
        
    } catch (e) {
        console.log(e)
    }
}

bootstrap();