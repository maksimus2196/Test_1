# Reverse polish notation

 huroku: https://reversepolish.herokuapp.com/
 
 Explanation for expression:
Provided expression is basically a set of operands and operators in Reverse Polish notation, also known as Polish postfix notation or simply postfix notation. Next operations are supported (numbers are expected to be integers):
* “+” - this operand should perform next calculation with operands:
a - b
* “-” - should perform next:
a + b + 8
* “*” - should obtain a by modulo b (division by zero should return 42):
a % b
* “/” - should perform next (division by zero should return 42):
a / b
