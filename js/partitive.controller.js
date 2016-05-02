(function(){
	angular.module('open-finnish-lang').controller('partitiveController', partitiveController);
	
	partitiveController.$inject = ['$rootScope', 'caseService'];
	
	function partitiveController($rootScope, caseService){
		var self = this;
		
		self.singularTestWord = "";
		self.singularAnswer = "";
		//self.hasAnswered = false;
		//self.isAnswerCorrect = false;
		
		var rightAnswer = "";
		
		function getRightAnswer(word){
			return caseService.getSimpleSingularPartitive(word);
		}
		
		self.promptNewTestWord = function(){
			$rootScope.$broadcast('result.reset');
			self.singularAnswer = "";
			
			var index = Math.round(Math.random()*_simpleNouns.length);
			var word = _simpleNouns[index];
			
			self.singularTestWord = word;
		};
		
		self.evaluate = function(override){
			if(override)
				self.singularTestWord = override;
			
			rightAnswer = getRightAnswer(self.singularTestWord);
			console.log(rightAnswer);
			
			var isAnswerCorrect = (rightAnswer === self.singularAnswer);
			//~ self.hasAnswered = true;
			
			if(isAnswerCorrect){
				$rootScope.$broadcast('result.correct');
			}
			else{
				$rootScope.$broadcast('result.false', rightAnswer);
			}
		};
		
		self.promptNewTestWord();
	}
})();
