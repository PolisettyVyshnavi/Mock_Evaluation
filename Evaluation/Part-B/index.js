// let nums=[10,3,7,20,13,2];
// let squares=nums.map(num=>num*num)
// console.log(squares)


// function prime(num){
//     if(num<=1){
//         return false
//     }
//     for(let i=2,sqrt=Math.sqrt(num);i<=sqrt;i++){
//         if(num%i==0){
//             return false
//         }
//     }
//     return true
// }
// let nums = [10, 3, 7, 20, 13, 2];
// let primenum=nums.filter(prime)
// console.log(primenum)


// let nums = [10, 3, 7, 20, 13, 2];
// let sum=nums.reduce((acc,curr)=>acc+curr,0)
// console.log(sum)


let nums = [10, 3, 7, 20, 13, 2];
let descending=nums.sort((a,b)=>b-a)
console.log(descending)


function vehicleInfo(vehicleCategory,callbackFn){
    callbackFn();
}
function displayCar(){
    console.log("Display car info")
}
function displayTruck()
{
    console.log("Display truck info")
}
function displayBike()
{
    console.log("Display bike info")
}
vehicleInfo("Car", displayCar)
vehicleInfo("Truck", displayTruck)
vehicleInfo("Bike", displayBike)