export const type='findResults';

const findResults =text=>{
    return{
        //Accion
        type,
        payload:text
    };
};

export default findResults;