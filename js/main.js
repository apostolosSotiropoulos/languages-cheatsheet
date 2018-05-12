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
class Vehicle
  attr_reader :name  defines a class method name for class var name
  PURPOSE = 'transfer things and humans'.freeze  constant
  @@type = 'Vehicle'  class variable

   class method
  def self.type
    @@type
  end

  def initialize(name)
     instance variable : every instance can have a different value for it
    @name = name
  end

   instance method
  def start
    "#{@@type} named #{@name} just started trying to #{PURPOSE}."
  end
end

some_vehicle = Vehicle.new 'fiab'
puts 'Scope?'
puts "-Class variable (i.e @@type = #{Vehicle.type}): Available from the\
 class definition and any sub-classes. Not available from anywhere outside."
puts "-Instance variable (i.e @name = #{some_vehicle.name}): Available\
 only within a specific object, across all methods in a class instance.\
 Not available directly from class definitions."
puts '-Global variable ($a_variable): Available everywhere within the script.'
puts '-Local variable (a_variable): It depends on the scope.'
puts '-- local variables created in the blocks are not available outside them'
puts '-- local variables created outside the block are available within them'

 Inheritance?
 Resources:
 https://learnrubythehardway.org/book/ex44.html
class Car < Vehicle
  def initialize(name, doors = 2)
    super name
    @doors = doors
  end

  def two_doored?
    @doors == 2
  end
end

some_car = Car.new 'aubi', 4
puts 'Inheritance?'
puts '-easy. For instance lets try starting my car: '
puts "-#{some_car.start}"
puts '-and btw this is a 2 doored car' if some_car.two_doored?  won't show

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
