import { evaluate } from 'mathjs';
import {MAYA_FALSE_EXPRESSION} from "../cosnts";


const calculator =  (expresion) => {
  try {
    return evaluate(expresion).toString();
  } catch (e) {
    return MAYA_FALSE_EXPRESSION
  }

};

export default calculator;