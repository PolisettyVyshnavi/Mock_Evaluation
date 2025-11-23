function counter(){
    let count=1
    return function(){
        return count++
    }
}
const c = counter();
console.log(c());
console.log(c());
console.log(c());


function createWallet(){
    let balance=0
    return {
        addMoney:function(amount){
            balance+=amount;
        },
        checkBalance:function(){
            console.log(balance)
        }
    }
}
let myWallet = createWallet();
myWallet.addMoney(500);
myWallet.addMoney(200);
myWallet.checkBalance();  