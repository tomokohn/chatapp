import { evaluate } from 'mathjs';


const calculator =  (expresion) => {
  return evaluate(expresion);
};

export default calculator;