(function(){
	angular.module('open-finnish-lang').controller('resultsController', resultsController);
	
	resultsController.$inject = ['$rootScope'];
	
	function resultsController($rootScope){
		var self = this;
		self.correct = 0;
		self.total = 0;
		
		self.hasAnswered = false;
		self.isAnswerCorrect = false;
		self.lastCorrectAnswer = '';
		
		$rootScope.$on('result.correct', function(){ processResult(true) });
		$rootScope.$on('result.false', function(evt, correctResult) { processResult(false, correctResult) });
		$rootScope.$on('result.reset', function(){ reset(); });
		
		function processResult(isCorrect, correctResult){
			console.log('processing', isCorrect, correctResult);
			self.hasAnswered = true;
			self.lastCorrectAnswer = '';
			
			if(isCorrect){
				self.correct++;
				self.isAnswerCorrect = true;
			}
			else{
				self.isAnswerCorrect = false;
				self.lastCorrectAnswer = correctResult;
			}
			
			self.total++;
		}
		
		function reset(){
			self.hasAnswered = false;
		}
	}
})();
