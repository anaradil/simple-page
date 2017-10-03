function Person () {}
Person . prototype . greet = function () { return " Hello !";};
var person = new Person ();
Person . prototype . greet = function () { return " No thank you !";};
Person . prototype = {
bounce : function () {
return true ;
}
};
var person2 = new Person ();
console.log(person . greet ());
//console.log(person . bounce ()); //
console.log(person2 . bounce ());