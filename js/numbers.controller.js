(function(){
	angular.module('open-finnish-lang').controller('numbersController', numbersController);
	
	numbersController.$inject = ['$rootScope'];
	
	function numbersController($rootScope){
		const oneTenNumbers = new Map([
			[0, "nolla"],
			[1, "yksi"],
			[2, "kaksi"],
			[3, "kolme"],
			[4, "neljä"],
			[5, "viisi"],
			[6, "kuusi"],
			[7, "seitsemän"],
			[8, "kahdeksän"],
			[9, "yhdeksän"],
			[10, "kymmenen"]
		]);
		
		const elvNineteenPostfix = "toista";
		const tensPostfix = "kymmentä";
		
		var minNumber = 0;
		var maxNumber = 100;
		var randomNumber = 0;
		
		var self = this;
		
		self.numberAnswer = null;
		self.numberWord = "";
		self.hasAnswered = false;
		self.isAnswerCorrect = false;
		
		self.nextRandomNumber = function(){
			self.hasAnswered = false;
			self.numberAnswer = null;
			randomNumber = getRandomNumber(minNumber, maxNumber);
			self.numberWord = formNumberWord(randomNumber);
			
			//console.log('random num', randomNumber);
			console.log(self.numberWord);
		};
		
		self.evaluateAnswer = function(){
			$rootScope.totalAnswers++;
			
			console.log(self.numberAnswer);
			console.log('random num', randomNumber);
			self.hasAnswered = true;
			
			self.isAnswerCorrect = parseInt(self.numberAnswer, 10) === randomNumber;
			
			if(self.isAnswerCorrect)
				$rootScope.correctAnswers++;
		};
		
		function formNumberWord(num){	
			if(num <= 10)
				return oneTenNumbers.get(num);
			
			if(num > 10 && num < 20){
				var digit = num - 10;
				var firstPart = oneTenNumbers.get(digit);
				
				return firstPart + elvNineteenPostfix;
			}
			
			if(num >= 20 && num < 100){
				var tens = num.toString()[0];
				console.log(tens);
				var tensWord = oneTenNumbers.get(parseInt(tens, 10));
				
				var ones = num.toString()[1];
				var onesWord = oneTenNumbers.get(parseInt(ones, 10));
				return tensWord + tensPostfix + onesWord;
			}
			
			throw new Error("Number out of range");	
		}
		
		function getRandomNumber(min, max){
			var res = Math.round(Math.random()*max);
			return res;
		}
	}
})();
