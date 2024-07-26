
const JoiException = async (schema, body) => {
    
    try {
        return {error:null,value:await schema.validateAsync(body)}
    } catch (err) {
          return {error:err?.details[0]?.message,value:null}
    }
    
}
module.exports = {JoiException}