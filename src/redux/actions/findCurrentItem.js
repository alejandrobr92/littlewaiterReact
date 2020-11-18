//actioncreator
/*¿
te permite crear una funcion que te regresa un objeto y ese objeto es una funcion

 * @param {*} id 
 */

 /** 
  * 
  * sirve como identificador unico
  */
export const type='findCurrentItem';

const findCurrentImtem =id=>{
    return{
        //Accion
        type,
        payload:id  
    };
};

export default findCurrentImtem;