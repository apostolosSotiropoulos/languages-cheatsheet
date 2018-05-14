// pls execute me by opening index.html in a browser and checking browser console

/*
  Function Args: Pass by value or by reference?
  Resources:
  https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language#3638034
  https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8
*/

function changeStuff (a, b, c) {
  a = a * 10 // a is a var declared here. It will die when this function (and it's kids) finish execution
  b.item = 'changed'
  c = { item: 'changed' } // same as a
}

let a = 1
let b = {item: 'unchanged'}
let c = {item: 'unchanged'}
console.log('Function Args: Pass by value or by reference?')
changeStuff(a, b, c)
if (a === 1 && b.item === 'changed' && c.item === 'unchanged') {
  console.log('- By sharing. Mutable objects passed in functions args can be changed by the function.')
  console.log('- Primitive types like strings, numbers, or booleans, will not since they are immutable')
}

/*
  Scope?
  Resources:
  https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language#3638034
  https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8
*/

function changeObject (x) {
  x = { member: 'altered' }
  console.log('-- object value in function call has value : ' + x.member)
}

function two () {
  var x0 = 1
  function f1 () {
    var x1 = 1
    return x1 + x0
  }
  return f1()
}

console.log('Scope?')
console.log('- There are globals and locals. All are globals unless declared in a function.')
console.log('- Those are called locals and their scope extends in the function and the functions declared in it.')
let anObject = { member: 'original' }
console.log('- For instance:')
console.log('-- object value before function call has value : ' + anObject.member)
changeObject(anObject)
console.log('-- object value after function call has value : ' + anObject.member)
console.log('-- function two returns: ' + two())

/*
  Inheritance?
  Resources:
  https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes
  https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
*/

function Person (name, birthYear) {
  this.birthYear = birthYear
  this.name = name
  this.type = 'person'
}

Person.prototype.greeting = function () {
  return 'this is a ' + this.type + ' named ' + this.name + ' born in ' + this.birthYear
}

Person.prototype.yearsOld = function () {
  return ((new Date()).getFullYear() - this.birthYear) + ' years old'
}

function Teacher (name, birthYear, subject) {
  Person.call(this, name, birthYear)
  this.students = []
  this.subject = subject
  this.type = 'teacher'
}

// inheritance implemented through these 2 lines
Teacher.prototype = Object.create(Person.prototype)
Teacher.prototype.constructor = Teacher

Teacher.prototype.showStudents = function () {
  console.log('-- has students:')
  for (let i = 0; i < this.students.length; i++) {
    console.log('--- ' + this.students[i])
  }
}

Teacher.prototype.greeting = function () {
  return 'this is a ' + this.type + ' named ' + this.name + ' born in ' + this.birthYear + ' teaching ' + this.subject
}

let apos = new Person('apos', 1987)
let toli = new Person('toli', 1987)
let mara = new Teacher('mara', 1986, 'mathematics')
mara.students.push(apos.name)
mara.students.push(toli.name)

console.log('Inheritance?')
console.log('- Vanila JS is not designed for it.')
console.log('- Functions can be used as constructors.')
console.log('- Their prototype attr shows which methods are going to be accessible to their instances')
console.log('- Instances have a __proto__ attr pointing to their prototype')
console.log('- For instance:')
console.log('-- ' + apos.greeting())
console.log('-- ' + toli.greeting())
console.log('-- ' + mara.greeting())
console.log('-- ' + mara.name + ' is ' + mara.yearsOld())
mara.showStudents()

/*
 Multiple Inheritance?
 Resources:
 https://ruby-doc.com/docs/ProgrammingRuby/html/tut_modules.html

 this is a module namespacing the methods defined in it
module Wheelable
  def wheels?
    true
  end
end

 multiple inheritance via use of include and modules
class MotorBike < Vehicle
  include Wheelable
end

some_bike = MotorBike.new 'yamada'
puts 'Multiple inheritance?'
puts '-is available via mixins. For instance lets check my bike'
puts "-#{MotorBike.type}, #{some_bike.name}, has wheels" if some_bike.wheels?

 Composition? how to include other files, modules?
 Resources:
 https://stackoverflow.com/questions/318144/what-is-the-difference-between-include-and-require-in-ruby

 require is NEEDED for include
require "#{Dir.pwd}/ruby/reusables/printer.rb"

 class multiprinter to check how to call module Printer methods
class Multiprinter
  include Printer

  def test_printer
    puts "----#{instance_printer}"
    puts "----#{Printer.class_printer}"
  end
end

puts 'Composition? how to include other files, modules?'
puts '-there are 3 ways here. Include, require and load.'

puts "--Include: The include method takes all the methods from another module\
 and includes them into the current module. This is a language-level thing as\
 opposed to a file-level thing as with require. The include method is the\
 primary way to 'extend' classes with other modules (mix-ins). Let's check my\
 printer for instance:"
Multiprinter.new.test_printer

puts "--Require: runs another file. It also tracks history and does not\
 require the same file twice. Let's check my printer again:"
puts "----#{Printer::class_printer}"
puts "----#{Printer.class_printer}"

puts '--Load: runs another file every time. No history tracking.'

*/
