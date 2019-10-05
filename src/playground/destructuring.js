// Object destructuring

/* const person = {
	name: 'Denis',
	age: 26,
	location: {
		city: 'Milan',
		temp: 23
	}
}

const { name, age } = person;

console.log(`${name} is ${age}.`)

const { city, temp: temperature } = person.location;

console.log(`It's ${temperature} in ${city}.`)

 */
// Array destructuring

const address = ['1111 S Jupiter St', 'Moscow', 'Europe', '1726'];

const [, city, state] = address;

console.log(`You are in ${address[1]} ${address[2]}.`)
console.log(`You are in ${city} ${state}.`)