// variables

// primitive and non-primitive data types

// primitive [string, number, boolean]

// const 
let name = "abcd" //string  //101
let num = 10 //number
let bool = true //boolean

name = "qwewe"  //102

// non-primitive [arrays, objects, null]

let hobbies = [1,2,3,"abcd",true,[],{}];
let nothing = null;
let notDifined;

//console.log(name,num)

// operators
let x = 10, y = 3;
console.log(x + y);
console.log(x - y);
console.log(x * y);
console.log(x / y);
console.log(x % y);
console.log(x ** y); // 10 pow 3

console.log(x > y);
console.log(x == y); // it will check both values
console.log(x === y); // it will check both value and dataType

// Conditional statements

let score = 70;

if(score >= 60) {
    console.log("A");
}else if(score > 60) {
    console.log("B")
}else{
    console.log("C")
}

// ternery operator

console.log(score >= 60 ? "A" : score > 60 ? "B" : "C")
console.log(score > 60 ? true : false);

// switch case

// loops

// for, while

// i++ = i = i + 1

for(let i = 0; i <= 10; i++) {
    console.log(i);
}

let count = 0
while(count <= 10) {
    console.log(count);
    count = count + 1
}


// for-each loop

let fruits = ['apple','banana']

for(let i = 0; i <= fruits.length; i=i+1) {
    console.log(fruits[i])
}

let len = 0
while(len <= fruits.length) {
    console.log(fruits[len]);
    len = len + 1
}

for(let fruit of fruits) {
    console.log(fruit);
}



// Functions

// normal func

console.log(add(12,13))

function add(a, b) {
    return a + b;
}

console.log(add(12,13))




// arrow function
const sub = (a,b=20) => {
    return a - b
}

console.log(sub(10))

fruits.forEach((fruit) => console.log(fruit));

// arrays

let numbers = [1,2,3,4,5,6];
console.log(numbers.length);
console.log(numbers.includes(3));

numbers.push(7);
console.log(numbers);

numbers.pop();
console.log(numbers);

numbers.shift();
console.log(numbers);

numbers.unshift(0);
console.log(numbers);


// string methods

let text = "javaScript is good good";
console.log(text.length); //18
console.log(text.toUpperCase());
console.log(text.toLowerCase());
console.log(text.includes("good"));
console.log(text.split(" ")); ["javaScript", "is", "good"]
console.log(text.split("i")); ["javaScr", "pt ", "s good"]
text.replace("good", "bad");    // "javaScript is bad good"
text.replaceAll("good", "bad"); // "javaScript is bad bad"

let j = ["javaScript", "is", "good"];
console.log(j.join(",")); // "javaScript is good"

let number = 23;

// Template literals
console.log(`this is my lucky number ${number}`);

// destructing

let a = ["abcd", "qwer"];

console.log(a[0]);
console.log(a[1]);

let [a1, a2] = ["abcd", "qwer"];

console.log(a1);


let b = ["lkj", "weiir"];

console.log(a.concat(b)); // ["abcd", "qwer", "lkj", "weiir"];
console.log([...a, ...b]); // ["abcd", "qwer", "lkj", "weiir"];


// Objects -> Non-premive DT

let obj = {}   // JSON JAVASCRIPT OBJECT NOTATION

// Obj required 2 things key and value

obj["name"] = "Santhosh"
obj["age"] = "23"
obj["fn"] = "abcd"

console.log(obj)

console.log(obj["name"]);

console.log(Object.keys(obj)); // array
console.log(Object.values(obj)); // array
console.log(Object.entries(obj)); // array

let array = [["key", "value"]];
console.log(Object.fromEntries(array));

obj["name"] = "zxcvbnm";
delete obj["name"];

// higher order functions

// map, filter, forEach, find, reduce, sort

let numArray = [1,2,3,4,5,6];
console.log(numArray.map(x => x*x)) // [1,4,9,16,25,36]
console.log(numArray.filter(x => x > 3)) // [4,5,6]
numArray.forEach(x => console.log(x * 2)) //
console.log(numArray.find(x => x>3)) // 4
console.log(numArray.reduce((number,value) => number+value ,0))

let n = 0;

for(let i = 0; i < numArray.length; i++) {
    n = n + numArray[i]
}

/**
 *   number = 0, value = 1
 *   number = 1, value = 2
 *   number = 3, value = 3
 *   number = 6, value = 4
 * 
 */







