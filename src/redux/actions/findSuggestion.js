export const type='findSuggestions';

const findSuggestions =text=>{
    return{
        //Accion
        type,
        payload:text 
    };
};

export default findSuggestions;