let arr1 = [10, 20, 30];
let arr2 = [40, 50];
let combined=[...arr1,...arr2]
console.log(combined)


let person = { name: "Venu", age: 25 };
let extra = { city: "Bengaluru" };
let profile={...person,...extra}
console.log(profile)


function sumAll(...numbers){
    let sum=0
    for(let num of numbers){
        sum=sum+num
    }
    return sum
}
console.log(1,2,3,4)


let numbers=[10,20,30,40,50]
let[a,...remaining]=numbers
console.log(a)
console.log(remaining)


let user = {
  name: "Alice",
  address: {
    city: "Bengaluru",
    pin: 560001,
    geo: { lat: 11.22, lng: 77.33 }
  }
};
const{address:{city,geo:{lat,lng}}}=user


let multiply=(a,b)=>a*b
console.log(multiply(6,4))


let emp = {
  name: "Prakash",
  details: {
    department: "IT",
    profile: { role: "Developer" }
  }
};
console.log(emp.details.profile?.role)


