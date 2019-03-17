var readline = require('readline-sync');

do {
    var num = readline.question(`Pick a number between 10 - 20: `);
    if(num % 2 !== 0) {
        console.log(`Pick an even number!`);
    } else {
        var listArr = [];
        var sumUser = 0;
        var sumAI = 0;

        do{
            //Generate random list based on User input of number
            if(listArr.length === 0) {
                do{
                    var rand = Math.floor(Math.random() * 11) + 10; //Random unique numbers 10 - 20
                    if(listArr.indexOf(rand) === -1) listArr.push(rand);
                } while(listArr.length !== parseInt(num));
            }

            //List of numbers
            console.log(`List: ${listArr}`);

            console.log(`----------------------------------------------`);

            //User pick a number
            var userNum = parseInt(readline.question(`Pick a number from most left or right: `));

            console.log(`You pick: ${userNum}`);

            //SUM of User numbers
            sumUser += userNum;
            //Delete selected number
            var index = listArr.indexOf(userNum);
            if (index !== -1) listArr.splice(index, 1);

            //AI pick random number
            var AINum = listArr[Math.floor(Math.random() * listArr.length)];
            console.log(`AI pick : ${AINum}`);
            //SUM of AI numbers
            sumAI += AINum;
            //Delete selected number
            var index = listArr.indexOf(AINum);
            if (index !== -1) listArr.splice(index, 1);  

            //Total SUMs
            console.log(`Your SUM : ${sumUser}`);
            console.log(`AI SUM : ${sumAI}`);
        } while(listArr.length > 0); //Keep looping until numbers in listArr is empty
        
        //Game result
        if(sumUser > sumAI) {
            console.log('Game Over, You WIN!');
        } else {
            console.log('Game Over, You LOSE!');
        }
    }
} while(num % 2 !== 0);